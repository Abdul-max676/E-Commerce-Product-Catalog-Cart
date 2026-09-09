from django.urls import path
from .views import OrderCreateView, PaymentInitializeView, ProductDetailView, ProductListView

urlpatterns = [
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<slug:slug>/', ProductDetailView.as_view(), name='product-detail'),
    path('orders/', OrderCreateView.as_view(), name='order-create'),
    path('orders/<int:order_id>/payment/', PaymentInitializeView.as_view(), name='payment-initialize'),
]
