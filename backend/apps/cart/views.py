from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import get_object_or_404

from apps.products.models import Product
from .models import Cart, CartItem
from .serializers import AddToCartSerializer , CartSerializer , UpdateCartItemSerializer 
class AddToCartAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = AddToCartSerializer(
            data=request.data
        )

        if serializer.is_valid():

            product = get_object_or_404(
                Product,
                pk=serializer.validated_data["product_id"]
            )

            quantity = serializer.validated_data["quantity"]

            cart, created = Cart.objects.get_or_create(
                user=request.user
            )

            cart_item, item_created = CartItem.objects.get_or_create(
                cart=cart,
                product=product,
                defaults={
                    "quantity": quantity
                }
            )

            if not item_created:

                cart_item.quantity += quantity

                cart_item.save()

            return Response(
                {
                    "message": "Product added to cart successfully."
                },
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
class ViewCartAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        cart = get_object_or_404(
            Cart,
            user=request.user
        )

        serializer = CartSerializer(cart)

        return Response(serializer.data)
class UpdateCartItemAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):

        serializer = UpdateCartItemSerializer(
            data=request.data
        )

        if serializer.is_valid():

            cart_item = get_object_or_404(
                CartItem,
                pk=pk,
                cart__user=request.user
            )

            cart_item.quantity = serializer.validated_data["quantity"]

            cart_item.save()

            return Response(
                {
                    "message": "Cart updated successfully."
                },
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
class DeleteCartItemAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):

        cart_item = get_object_or_404(
            CartItem,
            pk=pk,
            cart__user=request.user
        )

        cart_item.delete()

        return Response(
            {
                "message": "Cart item deleted successfully."
            },
            status=status.HTTP_200_OK
        )        
    