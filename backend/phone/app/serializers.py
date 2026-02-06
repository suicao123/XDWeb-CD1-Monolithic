from .models import *
from rest_framework import serializers
from django.contrib.auth.hashers import check_password
from django.shortcuts import get_object_or_404
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CatogorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class CartProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'productname', 'price', 'image']

class CartSerializer(serializers.ModelSerializer):
    product = CartProductSerializer(read_only=True)
    class Meta:
        model = Cart
        fields = ["id", "product", "quantity"]

class AddToCartSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField()      
    class Meta:
        model = Cart
        fields = ['product_id', 'quantity']
    
    def save(self, **kwargs):
        user = self.context['request'].user
        product_id = self.validated_data['product_id']
        quantity = self.validated_data.get('quantity', 1)

        product = get_object_or_404(Product, id= product_id)

        cart_item, created = Cart.objects.get_or_create(
            user=user,
            product=product,
            defaults={'quantity': quantity}
        )

        if not created:
            cart_item.quantity +=quantity
            cart_item.save()
        return cart_item
    

class OrderDetailSerializer(serializers.ModelSerializer):
    product = CartProductSerializer(read_only=True)
    class Meta:
        model =OrderDetail
        fields = ['product', 'price', 'quantity','total']

class OrderSerializer(serializers.ModelSerializer):
    details = OrderDetailSerializer(many=True, read_only=True)
    class Meta:
        model = Order
        fields = [
            'id',
            'total',
            'address',
            'note',
            'status',
            'createddate',
            'details'
        ]
