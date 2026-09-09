from decimal import Decimal
import requests
from django.conf import settings
from django.db import transaction
from django.utils import timezone
from rest_framework.exceptions import ValidationError
from .models import Order, OrderItem, Product

USD_TO_NGN = Decimal('1400')


@transaction.atomic
def create_order(validated_data):
    items_data = validated_data.pop('items')
    products = {product.external_id: product for product in Product.objects.select_for_update().filter(external_id__in=[item['product_id'] for item in items_data])}
    order = Order.objects.create(**validated_data)
    total = Decimal('0')
    for item_data in items_data:
        product = products.get(item_data['product_id'])
        if product is None:
            raise ValidationError({'items': f"Product {item_data['product_id']} was not found."})
        if product.stock < item_data['quantity']:
            raise ValidationError({'items': f'{product.title} does not have enough stock.'})
        OrderItem.objects.create(order=order, product=product, quantity=item_data['quantity'], unit_price_usd=product.price_usd, selected_size=item_data.get('selected_size', ''), selected_color=item_data.get('selected_color', ''))
        product.stock -= item_data['quantity']
        product.save(update_fields=['stock', 'updated_at'])
        total += product.price_usd * item_data['quantity']
    order.total_usd = total
    order.save(update_fields=['total_usd'])
    return order


def initialize_paystack(order):
    if not settings.PAYSTACK_SECRET_KEY:
        reference = f'test-mode-{order.id}-{timezone.now().strftime("%Y%m%d%H%M%S")}'
        order.paystack_reference = reference
        order.status = 'paid'
        order.save(update_fields=['paystack_reference', 'status'])
        return {
            'reference': reference,
            'status': 'test_mode',
            'message': 'Test mode enabled. No real payment verification is required.',
            'amount': int(order.total_usd * USD_TO_NGN * 100),
            'currency': 'NGN',
        }

    response = requests.post('https://api.paystack.co/transaction/initialize', headers={'Authorization': f'Bearer {settings.PAYSTACK_SECRET_KEY}', 'Content-Type': 'application/json'}, json={'email': order.email, 'amount': int(order.total_usd * USD_TO_NGN * 100), 'currency': 'NGN', 'reference': f'marketly-order-{order.id}'}, timeout=15)
    response.raise_for_status()
    data = response.json()
    order.paystack_reference = data['data']['reference']
    order.save(update_fields=['paystack_reference'])
    return data['data']
