import django_filters
from app.models import Product

class ProductIphone(django_filters.FilterSet):
    productname = django_filters.CharFilter(field_name='productname', lookup_expr='icontains')
    class Meta:
        model = Product
        fields = ['productname']