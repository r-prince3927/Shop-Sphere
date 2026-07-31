from django.core.mail import send_mail
from django.conf import settings


def send_order_confirmation_email(user, order):
    """
    Sends an order confirmation email to the customer.
    """

    subject = f"ShopSphere - Order #{order.id} Confirmed"

    message = f"""
Hi {user.email},

Thank you for shopping with ShopSphere!

Your order has been placed successfully.

Order ID : {order.id}
Status   : {order.status}

You can view your orders anytime by logging into your account.

Thank you for choosing ShopSphere.

Regards,
ShopSphere Team
"""

    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        fail_silently=False,
    )