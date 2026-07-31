from rest_framework import serializers

from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:

        model = OrderItem

        fields = (
            "product_name",
            "product_image",
            "purchase_price",
            "quantity",
        )


class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(
        many=True,
        read_only=True,
    )

    class Meta:

        model = Order

        fields = (
            "id",

            # Delivery Address Snapshot
            "delivery_full_name",
            "delivery_phone",
            "delivery_address_line_1",
            "delivery_address_line_2",
            "delivery_city",
            "delivery_state",
            "delivery_postal_code",
            "delivery_country",

            # Order Totals
            "subtotal",
            "delivery_charge",
            "tax",
            "total_amount",

            # Payment
            "payment_status",
            "status",

            # Metadata
            "created_at",

            # Products
            "items",
        )


class CheckoutSerializer(serializers.Serializer):

    address_id = serializers.IntegerField()


class VerifyPaymentSerializer(serializers.Serializer):

    address_id = serializers.IntegerField()

    razorpay_order_id = serializers.CharField()

    razorpay_payment_id = serializers.CharField()

    razorpay_signature = serializers.CharField()