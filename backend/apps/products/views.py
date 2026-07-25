from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .pagination import ProductPagination
class ProductListAPIView(APIView):

    def get(self, request):
        search = request.query_params.get("search")
        category = request.query_params.get("category")
        min_price = request.query_params.get("min_price")
        max_price = request.query_params.get("max_price")
        ordering = request.query_params.get("ordering")
        products = Product.objects.all()
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
        paginator = ProductPagination()
        page = paginator.paginate_queryset(
            products,
            request
        )
        if ordering:
            products = products.order_by(ordering)
        serializer = ProductSerializer(page, many=True)
        return paginator.get_paginated_response(
        serializer.data
        )
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
class ProductDetailAPIView(APIView):

    def get(self, request, pk):
        product = get_object_or_404(
            Product,
            pk=pk
        )
        serializer = ProductSerializer(product)
        return Response(serializer.data)
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
    def delete(self, request, pk):
        product = get_object_or_404(
            Product,
            pk=pk
        )
        product.delete()
        return Response(
            {
                "message": "Product deleted successfully."
            },
            status=status.HTTP_204_NO_CONTENT
        )