from rest_framework import serializers
from .models import User

class LoginSerializer(serializers.Serializer):

    email = serializers.EmailField()

    password = serializers.CharField()
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

        fields = (
            "id",
            "username",
            "email",
            "phone_number",
            "profile_picture",
            "password",
        )

        extra_kwargs = {
            "password": {
                "write_only": True
            }
        }

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            phone_number=validated_data.get("phone_number"),
            profile_picture=validated_data.get("profile_picture"),
        )

        return user