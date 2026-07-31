from django.db import models
from django.conf import settings

from apps.products.models import Product


class Order(models.Model):

    class Status(models.TextChoices):

        PENDING = "PENDING", "Pending"
        PAID = "PAID", "Paid"
        SHIPPED = "SHIPPED", "Shipped"
        DELIVERED = "DELIVERED", "Delivered"
        CANCELLED = "CANCELLED", "Cancelled"

    class PaymentStatus(models.TextChoices):

        PENDING = "PENDING", "Pending"
        SUCCESS = "SUCCESS", "Success"
        FAILED = "FAILED", "Failed"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="orders"
    )

    # ==========================
    # DELIVERY ADDRESS SNAPSHOT
    # ==========================

    delivery_full_name = models.CharField(max_length=255)

    delivery_phone = models.CharField(max_length=20)

    delivery_address_line_1 = models.CharField(max_length=255)

    delivery_address_line_2 = models.CharField(
        max_length=255,
        blank=True
    )

    delivery_city = models.CharField(max_length=100)

    delivery_state = models.CharField(max_length=100)

    delivery_postal_code = models.CharField(max_length=20)

    delivery_country = models.CharField(max_length=100)

    # ==========================
    # ORDER TOTALS
    # ==========================

    subtotal = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    delivery_charge = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    tax = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    total_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    # ==========================
    # PAYMENT
    # ==========================

    payment_status = models.CharField(
        max_length=20,
        choices=PaymentStatus.choices,
        default=PaymentStatus.PENDING
    )

    razorpay_order_id = models.CharField(
        max_length=255,
        blank=True
    )

    razorpay_payment_id = models.CharField(
        max_length=255,
        blank=True
    )

    # ==========================
    # ORDER STATUS
    # ==========================

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return f"Order #{self.id}"

class OrderItem(models.Model):

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items"
    )

    # Reference to original product
    product = models.ForeignKey(
        Product,
        on_delete=models.PROTECT
    )

    # Snapshot of product details
    product_name = models.CharField(
        max_length=255 , null=True,
        blank=True,
    )

    product_image = models.CharField(
        max_length=500,
        blank=True
    )

    purchase_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    quantity = models.PositiveIntegerField()

    def __str__(self):

        return f"{self.product_name} × {self.quantity}"