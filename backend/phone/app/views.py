from django.shortcuts import render
from .models import *
from .serializers import *
from django.http import Http404
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
import random
from django.core.mail import send_mail
from django.conf import settings
from .momo import create_momo_payment
import time

# Create your views here.

def random_otp():
    return str(random.randint(100000, 999999))

class SendRegisterOTP(APIView):
    def post(self, request):
        email = request.data.get('email')

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email đã tồn tại"}, status=status.HTTP_400_BAD_REQUEST)
        otp = random_otp()

        EmailOTP.objects.update_or_create(
            email=email,
            defaults={"otp": otp, "created_at": timezone.now()}
        )

        send_mail(
            "Mã OTP đăng ký",
            f"Mã OTP của bạn là: {otp} (hiệu lực 5 phút)",
             settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False
        )
        return Response({"message": "Đã gửi OTP"})

class ProductList(APIView):
   def get(self, request):
    products = Product.objects.all()
    new = request.query_params.get('new')
    if new and new.lower() == 'true':
        products = products.order_by('-created_at')[:4]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
   
class ProductDetail(APIView):
    def get_obj(self,pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise Http404()
    def get(self,request,pk):
        product = self.get_obj(pk)
        serializers = ProductSerializer(product)
        return Response(serializers.data)

class ProductNameList(APIView):
    # filter_backends = [DjangoFilterBackend]
    # filterset_class = ProductIphone
    def get(self, request):
        keyword = request.query_params.get('name')
        queryset = Product.objects.all()
        if keyword:
            queryset = queryset.filter(productname__icontains=keyword)
        serializer = ProductSerializer(queryset,many=True)
        return Response(serializer.data)
        # queryset = Product.objects.all()
        # queryset = DjangoFilterBackend.filter_queryset(request,queryset,self)
        # serializer = ProductSerializer(queryset, many=True)
        # return Response(serializer.data)
    
# class ProductNewList(APIView):
#     def get(self,request):
#         productnew = Product.objects.order_by('-created_at')[:5]
#         serializer = ProductSerializer(productnew, many=True)
#         return Response(serializer.data)

class ProductSearchView(APIView):
    def get(self, request):
        query = request.query_params.get('q')
        if query:
            product = Product.objects.filter(productname__icontains=query)
        serializer = ProductSerializer(product, many=True)
        return Response(serializer.data)
    
class CategoryList(APIView):
    def get(self, request):
        keyword = request.GET.get('type')
        queryset = Category.objects.all()

        if keyword:
            queryset = queryset.filter(categoryname__icontains=keyword)

        serializer = CatogorySerializer(queryset,many=True)
        return Response(serializer.data)
    

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if not user:
            return Response(
                {"non_field_errors" : ["Sai tai khoan hoac mat khau"]}, status=status.HTTP_400_BAD_REQUEST
            )
        refresh = RefreshToken.for_user(user)

        return Response({
            "access" : str(refresh.access_token),
            "refresh" : str(refresh),
            "username" : user.username
        })
    
class RegisterView(APIView):
    def post(self, request):
        otp = request.data.get('otp')
        fullname = request.data.get('fullname')
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        confirm_password = request.data.get("confirm_password")

        if password != confirm_password:
            return Response({
                "error" : "Mat khau khong khop"},
                status= status.HTTP_400_BAD_REQUEST
            )
        
        try:
            record = EmailOTP.objects.get(email=email)
        except EmailOTP.DoesNotExist:
            return Response({"error": "OTP không tồn tại"}, status=400)

        if record.is_expired():
            return Response({"error": "OTP đã hết hạn"}, status=400)

        if record.otp != otp:
            return Response({"error": "OTP không đúng"}, status=400)
        
        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "Username đã tồn tại"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "Email đã được sử dụng"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=fullname
        )
        if user:
            record.delete()
            return Response(
                    {"message": "Đăng ký thành công"},
                    status=status.HTTP_201_CREATED
                )


class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AddToCartSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Đã thêm vào giỏ"}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # product_id = request.data.get("product_id")
        # quantity = int(request.data.get("quantity", 1))

        # product = Product.objects.get(id=product_id)

        # cart, created = Cart.objects.get_or_create(
        #     user=request.user,
        #     product=product
        # )

        # if not created:
        #     cart.quantity += quantity
        # else:
        #     cart.quantity = quantity

        # cart.save()

        # return Response({"message": "Đã thêm vào giỏ"}, status=200)

class CartList(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        cart = Cart.objects.filter(user=request.user)
        serializer = CartSerializer(cart, many=True)
        return Response(serializer.data)

class CartDetail(APIView):
    permission_classes = [IsAuthenticated]
    def get_obj(self,request,pk):
        try:
            return Cart.objects.get(user=request.user,pk=pk)
        except Cart.DoesNotExist:
            raise Http404()
        
    def get(self, request,pk):
        cart = self.get_obj(request,pk)
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    
    def delete(self, request, pk):
        cart = self.get_obj(request,pk)
        cart.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def patch(self, request, pk):
        cart_item = self.get_obj(request,pk)
        serializer = CartSerializer(cart_item,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class OrderList(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        pay_method = request.data.get('payment_method')
        cart_item = Cart.objects.filter(user=request.user)
        if not cart_item.exists():
            return Response({"error": "Giỏ hàng trống"}, status=status.HTTP_400_BAD_REQUEST)
        
        total = sum(item.product.price * item.quantity for item in cart_item)
        total_int = int(float(total))
        order = Order.objects.create(
            user=request.user,
            total=total,
            address=request.data.get('address'),
            status=0,
            process=0
        )
        for item in cart_item:
            OrderDetail.objects.create(
                order=order,
                product=item.product,
                price=item.product.price,
                quantity=item.quantity,
                total=item.product.price * item.quantity
            )
        cart_item.delete()

        if pay_method == "momo":
            try:
                unique_order_id = f"{order.id}_{int(time.time())}"
                momo_res = create_momo_payment(total_int, unique_order_id)
                print("MoMo response:", momo_res)

                if momo_res.get("resultCode") != 0:
                    return Response({
                        "error": momo_res.get("message", "MoMo payment failed"),
                        "momo_res": momo_res
                    }, status=400)

                return Response({
                    "payment_method": "momo",
                    "payUrl": momo_res.get("payUrl")
                })

            except Exception as e:
                print("MoMo EXCEPTION:", e)
                return Response({
                    "error": "Lỗi server khi gọi MoMo"
                }, status=500)
            

        return Response({
            "message": "Đặt hàng COD thành công",
            "order_id": order.id
        })
