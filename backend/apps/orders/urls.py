from django.urls import path
from .views import CheckoutAPIView , OrderHistoryAPIView , OrderDetailAPIView , MarkOrderPaidAPIView , VerifyPaymentAPIView
urlpatterns = [
    path(
        "checkout/",
        CheckoutAPIView.as_view(),
        name="checkout",
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

    path(
    "<int:pk>/pay/",
    MarkOrderPaidAPIView.as_view(),
    name="mark-order-paid",
    ),

    path(
    "<int:pk>/verify-payment/",
    VerifyPaymentAPIView.as_view(),
    name="verify-payment",
    ),
    

]