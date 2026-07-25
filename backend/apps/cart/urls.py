from django.urls import path
from .views import AddToCartAPIView, ViewCartAPIView , UpdateCartItemAPIView , DeleteCartItemAPIView

urlpatterns = [
    path(
        "add/",
        AddToCartAPIView.as_view(),
        name="add-to-cart",
    ),
    path(
        "",
        ViewCartAPIView.as_view(),
        name="view-cart",
    ),
    path(
    "item/<int:pk>/",
    UpdateCartItemAPIView.as_view(),
    name="update-cart-item",
    ),

    path(
    "item/<int:pk>/delete/",
    DeleteCartItemAPIView.as_view(),
    name="delete-cart-item",
    ),
]