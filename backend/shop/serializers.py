from rest_framework import serializers
from .models import Order, OrderItem, Product


class ProductSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='external_id', read_only=True)
    price = serializers.DecimalField(source='price_usd', max_digits=10, decimal_places=2, read_only=True)
    discountPercentage = serializers.DecimalField(source='discount_percentage', max_digits=5, decimal_places=2, read_only=True)
    thumbnail = serializers.URLField(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'title', 'slug', 'description', 'category', 'price', 'stock', 'rating', 'thumbnail', 'images', 'discountPercentage']


class OrderItemInputSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)
    selected_size = serializers.CharField(required=False, allow_blank=True)
    selected_color = serializers.CharField(required=False, allow_blank=True)


class OrderCreateSerializer(serializers.Serializer):
    email = serializers.EmailField()
    full_name = serializers.CharField(max_length=160)
    address = serializers.CharField(max_length=255)
    city = serializers.CharField(max_length=100)
    postal_code = serializers.CharField(max_length=20)
    items = OrderItemInputSerializer(many=True, allow_empty=False)


class OrderItemSerializer(serializers.ModelSerializer):
    line_total_usd = serializers.ReadOnlyField()

    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'unit_price_usd', 'line_total_usd', 'selected_size', 'selected_color']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'email', 'full_name', 'address', 'city', 'postal_code', 'status', 'total_usd', 'paystack_reference', 'created_at', 'items']
