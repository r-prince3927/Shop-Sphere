from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.db.models.deletion import ProtectedError

from .models import Product, Review
from .serializers import ProductSerializer, ReviewSerializer
from .pagination import ProductPagination
from .permissions import IsAdmin


# ============================================================
# PRODUCT LIST
# ============================================================

class ProductListAPIView(APIView):

    permission_classes = [AllowAny]

    def get(self, request):

        search = request.query_params.get("search")
        category = request.query_params.get("category")
        min_price = request.query_params.get("min_price")
        max_price = request.query_params.get("max_price")
        ordering = request.query_params.get("ordering")

        products = Product.objects.all().order_by("-id")

        if search:

            products = products.filter(

                Q(name__icontains=search) |

                Q(description__icontains=search)

            )

        if category:

            products = products.filter(

                category__iexact=category

            )

        if min_price:

            products = products.filter(

                price__gte=min_price

            )

        if max_price:

            products = products.filter(

                price__lte=max_price

            )

        if ordering:

            products = products.order_by(ordering)

        paginator = ProductPagination()

        page = paginator.paginate_queryset(
            products,
            request
        )

        serializer = ProductSerializer(
            page,
            many=True
        )

        return paginator.get_paginated_response(
            serializer.data
        )


# ============================================================
# PRODUCT CREATE
# ============================================================

class ProductCreateAPIView(APIView):

    permission_classes = [IsAdmin]

    def post(self, request):

        serializer = ProductSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


# ============================================================
# PRODUCT DETAIL
# ============================================================

class ProductDetailAPIView(APIView):

    permission_classes = [AllowAny]

    def get(self, request, pk):

        product = get_object_or_404(
            Product,
            pk=pk
        )

        serializer = ProductSerializer(product)

        return Response(serializer.data)


# ============================================================
# PRODUCT UPDATE
# ============================================================

class ProductUpdateAPIView(APIView):

    permission_classes = [IsAdmin]

    def patch(self, request, pk):

        product = get_object_or_404(
            Product,
            pk=pk
        )

        serializer = ProductSerializer(
            product,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


# ============================================================
# PRODUCT DELETE
# ============================================================

class ProductDeleteAPIView(APIView):

    permission_classes = [IsAdmin]

    def delete(self, request, pk):

        product = get_object_or_404(
            Product,
            pk=pk
        )

        try:

            product.delete()

        except ProtectedError:

            return Response(
                {
                    "error": "This product cannot be deleted because it is part of an existing order."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            {
                "message": "Product deleted successfully."
            },
            status=status.HTTP_204_NO_CONTENT
        )


# ============================================================
# CREATE REVIEW
# ============================================================

class ReviewCreateAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, pk):

        product = get_object_or_404(
            Product,
            pk=pk
        )

        if Review.objects.filter(
            product=product,
            user=request.user
        ).exists():

            return Response(
                {
                    "error": "You have already reviewed this product."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ReviewSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save(
                product=product,
                user=request.user
            )

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


# ============================================================
# UPDATE REVIEW
# ============================================================

class ReviewUpdateAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):

        review = get_object_or_404(

            Review,

            pk=pk,

            user=request.user

        )

        serializer = ReviewSerializer(

            review,

            data=request.data,

            partial=True

        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(

            serializer.errors,

            status=status.HTTP_400_BAD_REQUEST

        )


# ============================================================
# DELETE REVIEW
# ============================================================

class ReviewDeleteAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):

        review = get_object_or_404(

            Review,

            pk=pk,

            user=request.user

        )

        review.delete()

        return Response(

            {

                "message": "Review deleted successfully."

            },

            status=status.HTTP_204_NO_CONTENT

        )