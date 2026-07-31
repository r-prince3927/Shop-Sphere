from decimal import Decimal

from django.conf import settings
from django.db import transaction
from django.shortcuts import get_object_or_404

import razorpay

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.addresses.models import Address
from apps.cart.models import Cart
from apps.products.permissions import IsAdmin

from .email_utils import send_order_confirmation_email
from .models import Order, OrderItem
from .serializers import (
    CheckoutSerializer,
    OrderSerializer,
    VerifyPaymentSerializer,
)


client = razorpay.Client(
    auth=(
        settings.RAZORPAY_KEY_ID,
        settings.RAZORPAY_KEY_SECRET,
    )
)


# ==========================================================
# HELPER FUNCTION
# ==========================================================

DELIVERY_CHARGE = Decimal("50.00")

TAX_PERCENT = Decimal("18.00")


def calculate_cart_totals(cart):

    subtotal = Decimal("0.00")

    total_items = 0

    for item in cart.items.select_related("product"):

        subtotal += (
            item.product.price * item.quantity
        )

        total_items += item.quantity

    tax = (
        subtotal * TAX_PERCENT
    ) / Decimal("100")

    total = (
        subtotal
        + tax
        + DELIVERY_CHARGE
    )

    return {

        "subtotal": subtotal,

        "tax": tax,

        "delivery_charge": DELIVERY_CHARGE,

        "total_amount": total,

        "total_items": total_items,

    }
# ==========================================================
# CHECKOUT SUMMARY
# ==========================================================

class CheckoutSummaryAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = CheckoutSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        address = get_object_or_404(
            Address,
            id=serializer.validated_data["address_id"],
            user=request.user,
        )

        cart = get_object_or_404(
            Cart,
            user=request.user,
        )

        if not cart.items.exists():

            return Response(
                {
                    "error": "Cart is empty."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        totals = calculate_cart_totals(cart)

        return Response(
            {
                "selected_address": {

                    "id": address.id,

                    "full_name": address.full_name,

                    "phone_number": address.phone_number,

                    "address_line_1": address.address_line_1,

                    "address_line_2": address.address_line_2,

                    "city": address.city,

                    "state": address.state,

                    "postal_code": address.postal_code,

                    "country": address.country,
                },

                "subtotal": totals["subtotal"],

                "delivery_charge": totals["delivery_charge"],

                "tax": totals["tax"],

                "total_amount": totals["total_amount"],

                "total_items": totals["total_items"],
            }
        )
# ==========================================================
# ORDER HISTORY
# ==========================================================

class OrderHistoryAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        orders = (
            Order.objects
            .prefetch_related("items")
            .filter(user=request.user)
            .order_by("-created_at")
        )

        serializer = OrderSerializer(
            orders,
            many=True
        )

        return Response(serializer.data)


# ==========================================================
# ORDER DETAILS
# ==========================================================

class OrderDetailAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, pk):

        order = get_object_or_404(

            Order.objects.prefetch_related(
                "items"
            ),

            pk=pk,

            user=request.user,

        )

        serializer = OrderSerializer(order)

        return Response(serializer.data)
# ==========================================================
# CREATE RAZORPAY PAYMENT
# ==========================================================

class CreatePaymentAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = CheckoutSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        address = get_object_or_404(
            Address,
            id=serializer.validated_data["address_id"],
            user=request.user,
        )

        cart = get_object_or_404(
            Cart,
            user=request.user,
        )

        if not cart.items.exists():

            return Response(
                {
                    "error": "Cart is empty."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        totals = calculate_cart_totals(cart)

        razorpay_order = client.order.create(
            {
                "amount": int(
                    totals["total_amount"] * 100
                ),
                "currency": "INR",
                "payment_capture": 1,
            }
        )

        return Response(
            {
                "address": {

                    "id": address.id,

                    "full_name": address.full_name,

                    "city": address.city,
                },

                "subtotal": totals["subtotal"],

                "tax": totals["tax"],

                "delivery_charge": totals["delivery_charge"],

                "total_amount": totals["total_amount"],

                "total_items": totals["total_items"],

                "razorpay_order_id": razorpay_order["id"],

                "currency": razorpay_order["currency"],

                "amount": razorpay_order["amount"],

                "key": settings.RAZORPAY_KEY_ID,
            }
        )
# ==========================================================
# VERIFY PAYMENT & CREATE ORDER
# ==========================================================

class VerifyPaymentAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = VerifyPaymentSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        address = get_object_or_404(
            Address,
            id=serializer.validated_data["address_id"],
            user=request.user,
        )

        cart = get_object_or_404(
            Cart,
            user=request.user,
        )

        cart_items = cart.items.select_related(
            "product"
        )

        if not cart_items.exists():

            return Response(
                {
                    "error": "Cart is empty."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:

            client.utility.verify_payment_signature(
                {
                    "razorpay_order_id":
                        serializer.validated_data[
                            "razorpay_order_id"
                        ],

                    "razorpay_payment_id":
                        serializer.validated_data[
                            "razorpay_payment_id"
                        ],

                    "razorpay_signature":
                        serializer.validated_data[
                            "razorpay_signature"
                        ],
                }
            )

        except Exception:

            return Response(
                {
                    "error": "Payment verification failed."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        totals = calculate_cart_totals(cart)

        with transaction.atomic():

            order = Order.objects.create(

                user=request.user,

                delivery_full_name=address.full_name,

                delivery_phone=address.phone_number,

                delivery_address_line_1=address.address_line_1,

                delivery_address_line_2=address.address_line_2,

                delivery_city=address.city,

                delivery_state=address.state,

                delivery_postal_code=address.postal_code,

                delivery_country=address.country,

                subtotal=totals["subtotal"],

                tax=totals["tax"],

                delivery_charge=totals["delivery_charge"],

                total_amount=totals["total_amount"],

                payment_status=Order.PaymentStatus.SUCCESS,

                status=Order.Status.PAID,

                razorpay_order_id=serializer.validated_data[
                    "razorpay_order_id"
                ],

                razorpay_payment_id=serializer.validated_data[
                    "razorpay_payment_id"
                ],
            )

            for item in cart_items:

                OrderItem.objects.create(

                    order=order,

                    product=item.product,

                    product_name=item.product.name,

                    product_image=(
                        str(item.product.image)
                        if item.product.image
                        else ""
                    ),

                    purchase_price=item.product.price,

                    quantity=item.quantity,
                )

            cart_items.delete()

            send_order_confirmation_email(
                request.user,
                order
            )

        return Response(
            {
                "message": "Payment verified successfully.",

                "order_id": order.id,

                "payment_status": order.payment_status,

                "order_status": order.status,
            },
            status=status.HTTP_201_CREATED,
        )
