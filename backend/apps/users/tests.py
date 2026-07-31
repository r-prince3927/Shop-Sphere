from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.users.models import User


class UserRegistrationTest(APITestCase):

    def test_user_registration(self):

        url = reverse("register")

        data = {
            "username": "Prince",
            "email": "prince@test.com",
            "password": "Prince@123",
            "phone_number": "9999999999",
        }

        response = self.client.post(
            url,
            data,
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED
        )

        self.assertEqual(
            User.objects.count(),
            1
        )

        self.assertEqual(
            User.objects.first().email,
            "prince@test.com"
        )