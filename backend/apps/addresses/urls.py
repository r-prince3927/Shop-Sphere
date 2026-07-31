from django.urls import path

from .views import (
    AddressListCreateAPIView,
    AddressRetrieveUpdateDestroyAPIView,
)

urlpatterns = [

    path(
        "",
        AddressListCreateAPIView.as_view(),
        name="address-list",
    ),

    path(
        "<int:pk>/",
        AddressRetrieveUpdateDestroyAPIView.as_view(),
        name="address-detail",
    ),

]