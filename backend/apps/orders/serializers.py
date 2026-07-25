from rest_framework import serializers
from .models import Order ,OrderItem
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.StringRelatedField()
    class Meta:
        model = OrderItem
        fields = (
            "product",
            "purchase_price",
            "quantity",
        )
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(
        many=True,
        read_only=True
    )
    class Meta:
        model = Order
        fields = (
            "id",
            "status",
            "created_at",
            "items",
        )
class VerifyPaymentSerializer(serializers.Serializer):

    razorpay_order_id = serializers.CharField()

    razorpay_payment_id = serializers.CharField()

    razorpay_signature = serializers.CharField()        