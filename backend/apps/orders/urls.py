from django.urls import path

from .views import (
    CheckoutSummaryAPIView,
    CreatePaymentAPIView,
    VerifyPaymentAPIView,
    OrderHistoryAPIView,
    OrderDetailAPIView,
)

from .admin_views import (
    AdminOrderListAPIView,
    AdminOrderUpdateAPIView,
)

urlpatterns = [

    # ==========================
    # USER APIs
    # ==========================

    path(
        "checkout/",
        CheckoutSummaryAPIView.as_view(),
        name="checkout-summary",
    ),

    path(
        "payment/create/",
        CreatePaymentAPIView.as_view(),
        name="create-payment",
    ),

    path(
        "payment/verify/",
        VerifyPaymentAPIView.as_view(),
        name="verify-payment",
    ),

    path(
        "",
        OrderHistoryAPIView.as_view(),
        name="order-history",
    ),

    path(
        "<int:pk>/",
        OrderDetailAPIView.as_view(),
        name="order-detail",
    ),

    # ==========================
    # ADMIN APIs
    # ==========================

    path(
        "admin/all/",
        AdminOrderListAPIView.as_view(),
        name="admin-orders",
    ),

    path(
        "admin/<int:pk>/",
        AdminOrderUpdateAPIView.as_view(),
        name="admin-update-order",
    ),
]