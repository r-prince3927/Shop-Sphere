from rest_framework import serializers
from .models import CartItem , Cart
class AddToCartSerializer(serializers.Serializer):

    product_id = serializers.IntegerField()

    quantity = serializers.IntegerField(
        min_value=1
    )

class CartItemSerializer(serializers.ModelSerializer):

    product = serializers.StringRelatedField()

    price = serializers.SerializerMethodField()

    subtotal = serializers.SerializerMethodField()

    class Meta:

        model = CartItem

        fields = (
            "product",
            "price",
            "quantity",
            "subtotal",
        )

    def get_price(self, obj):

        return obj.product.price

    def get_subtotal(self, obj):

        return obj.product.price * obj.quantity 
class CartSerializer(serializers.ModelSerializer):

    items = CartItemSerializer(
        many=True,
        read_only=True
    )

    grand_total = serializers.SerializerMethodField()

    class Meta:

        model = Cart

        fields = (
            "items",
            "grand_total",
        )

    def get_grand_total(self, obj):

        total = 0

        for item in obj.items.all():

            total += item.product.price * item.quantity

        return total
    
class UpdateCartItemSerializer(serializers.Serializer):

    quantity = serializers.IntegerField(
        min_value=1
    )           