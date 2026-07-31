from rest_framework import serializers


class VerifyPaymentSerializer(serializers.Serializer):

    razorpay_payment_id = serializers.CharField()

    razorpay_order_id = serializers.CharField()

    razorpay_signature = serializers.CharField()