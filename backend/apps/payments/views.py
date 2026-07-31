import razorpay

from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .serializers import VerifyPaymentSerializer

class CreatePaymentAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        amount = request.data.get("amount")

        client = razorpay.Client(

            auth=(

                settings.RAZORPAY_KEY_ID,

                settings.RAZORPAY_KEY_SECRET,

            )

        )

        order = client.order.create({

            "amount": int(float(amount) * 100),

            "currency": "INR",

            "payment_capture": 1,

        })

        return Response({

            "order_id": order["id"],

            "amount": order["amount"],

            "currency": order["currency"],

            "key": settings.RAZORPAY_KEY_ID,

        })
class VerifyPaymentAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = VerifyPaymentSerializer(
            data=request.data
        )

        serializer.is_valid(raise_exception=True)

        client = razorpay.Client(

            auth=(

                settings.RAZORPAY_KEY_ID,

                settings.RAZORPAY_KEY_SECRET,

            )

        )

        try:

            client.utility.verify_payment_signature({

                "razorpay_payment_id":
                    serializer.validated_data["razorpay_payment_id"],

                "razorpay_order_id":
                    serializer.validated_data["razorpay_order_id"],

                "razorpay_signature":
                    serializer.validated_data["razorpay_signature"],

            })

            return Response(

                {

                    "success": True,

                    "message": "Payment Verified"

                }

            )

        except Exception:

            return Response(

                {

                    "success": False,

                    "message": "Payment Verification Failed"

                },

                status=status.HTTP_400_BAD_REQUEST,

            )    