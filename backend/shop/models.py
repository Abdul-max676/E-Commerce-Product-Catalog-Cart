from django.conf import settings
from django.db import models


class Product(models.Model):
    external_id = models.PositiveIntegerField(unique=True)
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=100, db_index=True)
    price_usd = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    thumbnail = models.URLField(blank=True)
    images = models.JSONField(default=list, blank=True)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title


class Order(models.Model):
    STATUS_CHOICES = [('pending', 'Pending'), ('paid', 'Paid'), ('cancelled', 'Cancelled')]
    email = models.EmailField()
    full_name = models.CharField(max_length=160)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    total_usd = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    paystack_reference = models.CharField(max_length=120, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField()
    unit_price_usd = models.DecimalField(max_digits=10, decimal_places=2)
    selected_size = models.CharField(max_length=20, blank=True)
    selected_color = models.CharField(max_length=40, blank=True)

    @property
    def line_total_usd(self):
        return self.unit_price_usd * self.quantity
