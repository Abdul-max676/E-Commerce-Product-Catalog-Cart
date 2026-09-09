from decimal import Decimal
from django.test import TestCase, override_settings
from rest_framework.test import APIClient
from .models import Order, OrderItem, Product


class CommerceApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.product = Product.objects.create(external_id=1, title='Test product', slug='test-product', category='beauty', price_usd=Decimal('10.00'), stock=5)

    def test_products_endpoint_lists_products(self):
        response = self.client.get('/api/products/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]['title'], 'Test product')
        self.assertEqual(response.data[0]['price'], '10.00')

    def test_order_endpoint_creates_order_and_decrements_stock(self):
        response = self.client.post('/api/orders/', {
            'email': 'buyer@example.com', 'full_name': 'Buyer One', 'address': '1 Market Street', 'city': 'Lagos', 'postal_code': '101001',
            'items': [{'product_id': self.product.id, 'quantity': 2, 'selected_size': 'M', 'selected_color': 'Cloud'}],
        }, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['total_usd'], '20.00')
        self.assertEqual(OrderItem.objects.count(), 1)
        self.product.refresh_from_db()
        self.assertEqual(self.product.stock, 3)

    def test_order_endpoint_rejects_insufficient_stock(self):
        response = self.client.post('/api/orders/', {
            'email': 'buyer@example.com', 'full_name': 'Buyer One', 'address': '1 Market Street', 'city': 'Lagos', 'postal_code': '101001',
            'items': [{'product_id': self.product.id, 'quantity': 10}],
        }, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(Order.objects.count(), 0)

    @override_settings(PAYSTACK_SECRET_KEY='')
    def test_payment_initialize_uses_test_mode_without_paystack_secret(self):
        order = Order.objects.create(
            email='buyer@example.com',
            full_name='Buyer One',
            address='1 Market Street',
            city='Lagos',
            postal_code='101001',
            total_usd=Decimal('10.00'),
        )

        response = self.client.post(f'/api/orders/{order.id}/payment/', {}, format='json')

        self.assertEqual(response.status_code, 200)
        self.assertIn('test-mode-', response.data['reference'])
        self.assertEqual(response.data['status'], 'test_mode')
        order.refresh_from_db()
        self.assertEqual(order.status, 'paid')
        self.assertTrue(order.paystack_reference.startswith('test-mode-'))