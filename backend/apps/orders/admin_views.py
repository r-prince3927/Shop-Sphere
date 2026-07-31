from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.products.permissions import IsAdmin

from .models import Order
from .serializers import OrderSerializer


# ==========================================================
# ADMIN - LIST ALL ORDERS
# ==========================================================

class AdminOrderListAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdmin,
    ]

    def get(self, request):

        orders = (
            Order.objects
            .prefetch_related("items")
            .select_related("user")
            .order_by("-created_at")
        )

        serializer = OrderSerializer(
            orders,
            many=True
        )

        return Response(serializer.data)


# ==========================================================
# ADMIN - UPDATE ORDER STATUS
# ==========================================================

class AdminOrderUpdateAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdmin,
    ]

    def patch(self, request, pk):

        order = get_object_or_404(
            Order,
            pk=pk,
        )

        status_value = request.data.get("status")

        valid_statuses = [
            choice[0]
            for choice in Order.Status.choices
        ]

        if status_value not in valid_statuses:

            return Response(
                {
                    "error": "Invalid order status."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        order.status = status_value
        order.save(update_fields=["status"])

        serializer = OrderSerializer(order)

        return Response(serializer.data)