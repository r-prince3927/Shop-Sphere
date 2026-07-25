from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.db import transaction
from django.shortcuts import get_object_or_404
from django.conf import settings

import razorpay

from apps.cart.models import Cart
from .models import Order, OrderItem
from .serializers import (
    OrderSerializer,
    VerifyPaymentSerializer,
)

client = razorpay.Client(
    auth=(
        settings.RAZORPAY_KEY_ID,
        settings.RAZORPAY_KEY_SECRET,
    )
)


class CheckoutAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        # Optimized using prefetch_related()
        cart = Cart.objects.prefetch_related(
            "items__product"
        ).get(
            user=request.user
        )

        cart_items = cart.items.all()

        if not cart_items.exists():

            return Response(
                {
                    "error": "Cart is empty."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        with transaction.atomic():

            order = Order.objects.create(
                user=request.user
            )

            for item in cart_items:

                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    purchase_price=item.product.price,
                    quantity=item.quantity,
                )

            cart_items.delete()

        return Response(
            {
                "message": "Order placed successfully."
            },
            status=status.HTTP_201_CREATED
        )


class OrderHistoryAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        orders = Order.objects.filter(
            user=request.user
        ).order_by(
            "-created_at"
        )

        serializer = OrderSerializer(
            orders,
            many=True
        )

        return Response(serializer.data)


class OrderDetailAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, pk):

        # Optimized using prefetch_related()
        order = get_object_or_404(
            Order.objects.prefetch_related(
                "items__product"
            ),
            pk=pk,
            user=request.user
        )

        serializer = OrderSerializer(order)

        return Response(serializer.data)


class MarkOrderPaidAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, pk):

        order = get_object_or_404(
            Order,
            pk=pk,
            user=request.user
        )

        if order.status != Order.Status.PENDING:

            return Response(
                {
                    "error": "Order is already paid."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        order.status = Order.Status.PAID

        order.save()

        return Response(
            {
                "message": "Payment successful.",
                "status": order.status
            },
            status=status.HTTP_200_OK
        )


class CreatePaymentAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, pk):

        # Optimized using prefetch_related()
        order = get_object_or_404(
            Order.objects.prefetch_related(
                "items"
            ),
            pk=pk,
            user=request.user
        )

        total = 0

        for item in order.items.all():

            total += item.purchase_price * item.quantity

        payment = client.order.create(
            {
                "amount": int(total * 100),
                "currency": "USD",
                "payment_capture": 1,
            }
        )

        return Response(payment)


class VerifyPaymentAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, pk):

        serializer = VerifyPaymentSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        order = get_object_or_404(
            Order,
            pk=pk,
            user=request.user
        )

        try:

            client.utility.verify_payment_signature(
                {
                    "razorpay_order_id":
                        serializer.validated_data["razorpay_order_id"],

                    "razorpay_payment_id":
                        serializer.validated_data["razorpay_payment_id"],

                    "razorpay_signature":
                        serializer.validated_data["razorpay_signature"],
                }
            )

        except Exception:

            return Response(
                {
                    "error": "Payment verification failed."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        order.status = Order.Status.PAID

        order.save()

        return Response(
            {
                "message": "Payment verified successfully."
            }
        )