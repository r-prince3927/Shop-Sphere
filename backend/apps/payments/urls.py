from django.urls import path

from .views import (
    CreatePaymentAPIView,
    VerifyPaymentAPIView,
)

urlpatterns = [

    path(

        "create/",

        CreatePaymentAPIView.as_view(),

        name="create-payment",

    ),

    path(

        "verify/",

        VerifyPaymentAPIView.as_view(),

        name="verify-payment",

    ),

]