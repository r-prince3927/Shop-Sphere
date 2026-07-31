from django.contrib.auth import get_user_model
from django.db.models import F, Sum

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.products.models import Product
from apps.orders.models import Order, OrderItem
from apps.products.permissions import IsAdmin

User = get_user_model()


# ==========================================================
# ADMIN DASHBOARD
# ==========================================================

class DashboardAPIView(APIView):

    permission_classes = [IsAdmin]

    def get(self, request):

        total_products = Product.objects.count()
        total_users = User.objects.count()
        total_orders = Order.objects.count()

        revenue = (
            OrderItem.objects.aggregate(
                total=Sum(F("purchase_price") * F("quantity"))
            )["total"]
            or 0
        )

        latest_orders = (
            Order.objects
            .select_related("user")
            .prefetch_related("items")
            .order_by("-id")[:5]
        )

        latest_users = (
            User.objects
            .order_by("-id")[:5]
        )

        return Response(
            {
                "total_products": total_products,
                "total_users": total_users,
                "total_orders": total_orders,
                "total_revenue": revenue,

                "latest_orders": [
                    {
                        "id": order.id,
                        "customer": order.user.email,
                        "status": order.status,
                        "amount": sum(
                            item.purchase_price * item.quantity
                            for item in order.items.all()
                        ),
                    }
                    for order in latest_orders
                ],

                "latest_users": [
                    {
                        "id": user.id,
                        "email": user.email,
                    }
                    for user in latest_users
                ],
            }
        )


# ==========================================================
# ADMIN USERS
# ==========================================================

class AdminUserListAPIView(APIView):

    permission_classes = [IsAdmin]

    def get(self, request):

        users = User.objects.order_by("-id")

        data = []

        for user in users:

            data.append(
                {
                    "id": user.id,
                    "email": user.email,
                    "is_staff": user.is_staff,
                    "is_superuser": user.is_superuser,
                    "date_joined": user.date_joined,
                }
            )

        return Response(data)


class AdminUserUpdateAPIView(APIView):

    permission_classes = [IsAdmin]

    def patch(self, request, pk):

        user = User.objects.get(pk=pk)

        is_staff = request.data.get("is_staff")

        if is_staff is None:

            return Response(
                {
                    "error": "is_staff is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.is_staff = is_staff
        user.save()

        return Response(
            {
                "message": "User updated successfully."
            }
        )