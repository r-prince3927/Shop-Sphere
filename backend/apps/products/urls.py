from django.urls import path

from .views import (
    ProductListAPIView,
    ProductCreateAPIView,
    ProductDetailAPIView,
    ProductUpdateAPIView,
    ProductDeleteAPIView,
    ReviewCreateAPIView,
    ReviewUpdateAPIView,
    ReviewDeleteAPIView,
)

urlpatterns = [

    path(
        "",
        ProductListAPIView.as_view(),
        name="product-list",
    ),

    path(
        "create/",
        ProductCreateAPIView.as_view(),
        name="product-create",
    ),

    path(
        "<int:pk>/",
        ProductDetailAPIView.as_view(),
        name="product-detail",
    ),

    path(
        "<int:pk>/update/",
        ProductUpdateAPIView.as_view(),
        name="product-update",
    ),

    path(
        "<int:pk>/delete/",
        ProductDeleteAPIView.as_view(),
        name="product-delete",
    ),

    # ==========================
    # Reviews
    # ==========================

    path(
        "<int:pk>/reviews/",
        ReviewCreateAPIView.as_view(),
        name="review-create",
    ),

    path(
        "reviews/<int:pk>/update/",
        ReviewUpdateAPIView.as_view(),
        name="review-update",
    ),

    path(
        "reviews/<int:pk>/delete/",
        ReviewDeleteAPIView.as_view(),
        name="review-delete",
    ),

]