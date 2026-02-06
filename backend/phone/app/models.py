from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta

class Category(models.Model):
    categoryname = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.categoryname

class Product(models.Model):
    productname = models.CharField(max_length=255)
    image = models.ImageField(upload_to='products/')
    price = models.FloatField()
    discount = models.FloatField(default=0)
    quantity = models.IntegerField()
    description = models.TextField()
    detail = models.TextField()
    guarantee = models.CharField(max_length=100)
    status = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    created_at = models.DateTimeField(auto_now_add=True,null=True)
    updated_at = models.DateTimeField(auto_now=True,null=True)    

    def __str__(self):
        return self.productname
    
# class User(models.Model):
#     username = models.CharField(max_length=150, unique=True)
#     password = models.CharField(max_length=128)
#     fullname = models.CharField(max_length=255)
#     email = models.EmailField(unique=True)
#     numberphone = models.CharField(max_length=15)
#     address = models.CharField(max_length=255)
#     avatarimage = models.ImageField(upload_to='avatars/', blank=True, null=True)
#     token = models.CharField(max_length=255, blank=True, null=True)
#     role = models.IntegerField(default=0)
#     status = models.IntegerField(default=1)
#     ordernum = models.IntegerField(default=0)
#     rejectnum = models.IntegerField(default=0)

class Email(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='emails')
    email = models.EmailField()
    message = models.TextField()
    name = models.CharField(max_length=255)
    createddate = models.DateTimeField(auto_now_add=True)

class EmailOTP(models.Model):
    email = models.EmailField(unique=True)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(default=timezone.now)
    
    def is_expired(self):
        return timezone.now() > self.created_at + timedelta(minutes=5)

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    content = models.TextField()
    rate = models.IntegerField()
    createddate = models.DateTimeField(auto_now_add=True)

class Promotion(models.Model):
    promotionname = models.CharField(max_length=255)
    description = models.TextField()
    percent = models.FloatField()
    startdate = models.DateTimeField()
    enddate = models.DateTimeField()
    status = models.IntegerField()

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    promotion = models.ForeignKey(Promotion, on_delete=models.SET_NULL, null=True, blank=True)
    total = models.FloatField()
    address = models.CharField(max_length=255)
    note = models.TextField(blank=True, null=True)
    createddate = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=20,null=True)
    status = models.IntegerField()
    process = models.IntegerField()

class OrderDetail(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='details')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.FloatField()
    quantity = models.IntegerField()
    total = models.FloatField()

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    class Meta:
        unique_together = ('user', 'product')


class Image(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='gallery')
    image = models.ImageField(upload_to='products/gallery/')