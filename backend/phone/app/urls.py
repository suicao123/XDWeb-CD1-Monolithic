from django.urls import path
from .views import *
urlpatterns = [
    path('product', ProductList.as_view()),
    path('productname/',ProductNameList.as_view()),
    path('product/<int:pk>',ProductDetail.as_view()),
    path('product/search/',ProductSearchView.as_view()),
    path('category',CategoryList.as_view()),
    path('cart/add/', AddToCartView.as_view()),
    path('cart/',CartList.as_view()),
    path('cart/<int:pk>', CartDetail.as_view()),
    path('cart/remove/<int:pk>/', CartDetail.as_view()),
    path('auth/login/', LoginView.as_view()),
    path('auth/register/', RegisterView.as_view()),
    path("auth/send-otp/", SendRegisterOTP.as_view()),
    path('order/', OrderList.as_view())
]
