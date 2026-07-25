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

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="orders"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )
class OrderItem(models.Model):

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items"
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.PROTECT
    )

    purchase_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.product.name} × {self.quantity}"    