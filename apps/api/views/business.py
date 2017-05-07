from rest_framework import viewsets

from apps.core.models import Store
from apps.api.serializers import StoreSerializer


class StoreViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer

