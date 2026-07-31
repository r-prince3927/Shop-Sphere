from rest_framework import serializers

from .models import Product, Review


class ReviewSerializer(serializers.ModelSerializer):

    user = serializers.ReadOnlyField(
        source="user.email"
    )

    class Meta:

        model = Review

        fields = [

            "id",
            "user",
            "rating",
            "comment",
            "created_at",

        ]


class ProductSerializer(serializers.ModelSerializer):

    average_rating = serializers.SerializerMethodField()

    review_count = serializers.SerializerMethodField()

    reviews = ReviewSerializer(
        many=True,
        read_only=True
    )

    class Meta:

        model = Product

        fields = [

            "id",
            "name",
            "description",
            "price",
            "category",
            "image",
            "stock",
            "created_at",
            "average_rating",
            "review_count",
            "reviews",

        ]

    def get_average_rating(self, obj):

        reviews = obj.reviews.all()

        if not reviews.exists():

            return 0

        total = sum(

            review.rating

            for review in reviews

        )

        return round(

            total / reviews.count(),

            1

        )

    def get_review_count(self, obj):

        return obj.reviews.count()