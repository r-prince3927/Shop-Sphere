from django.urls import path

from .views import (
    RegisterAPIView,
    LoginAPIView,
    ProfileAPIView,
)

from .admin_views import (
    DashboardAPIView,
    AdminUserListAPIView,
    AdminUserUpdateAPIView,
)

urlpatterns = [

    path(
        "register/",
        RegisterAPIView.as_view(),
        name="register",
    ),

    path(
        "login/",
        LoginAPIView.as_view(),
        name="login",
    ),

    path(
        "profile/",
        ProfileAPIView.as_view(),
        name="profile",
    ),

    path(
        "admin/dashboard/",
        DashboardAPIView.as_view(),
        name="admin-dashboard",
    ),

    path(
        "admin/users/",
        AdminUserListAPIView.as_view(),
        name="admin-users",
    ),

    path(
        "admin/users/<int:pk>/",
        AdminUserUpdateAPIView.as_view(),
        name="admin-user-update",
    ),

]