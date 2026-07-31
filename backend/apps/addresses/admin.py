from django.contrib import admin
from .models import Address


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "full_name",
        "phone_number",
        "city",
        "state",
        "postal_code",
        "is_default",
    )

    list_filter = (
        "city",
        "state",
        "is_default",
    )

    search_fields = (
        "full_name",
        "phone_number",
        "city",
        "user__username",
    )