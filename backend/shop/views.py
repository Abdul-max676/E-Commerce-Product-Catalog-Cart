from django.shortcuts import get_object_or_404
from rest_framework import filters, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Order, Product
from .serializers import OrderCreateSerializer, OrderSerializer, ProductSerializer
from .services import create_order, initialize_paystack


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'category']
    ordering_fields = ['price_usd', 'rating', 'created_at', 'title']
    ordering = ['title']


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'


class OrderCreateView(APIView):
    def post(self, request):
        serializer = OrderCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = create_order(serializer.validated_data)
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)


class PaymentInitializeView(APIView):
    def post(self, request, order_id):
        order = get_object_or_404(Order, id=order_id)
        payment = initialize_paystack(order)
        return Response(payment)
