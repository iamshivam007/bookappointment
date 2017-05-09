from rest_framework import viewsets

from apps.api.serializers.shopper import *
from utils.filters import *


class ShopperViewSet(viewsets.ModelViewSet):
    queryset = Shopper.objects.all()
    serializer_class = ShopperSerializer
    filter_class = ShopperFilterSet


class RegistryViewSet(viewsets.ModelViewSet):
    queryset = Registry.objects.all()
    serializer_class = RegistrySerializer
    filter_class = RegistryFilterSet


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    filter_class = AppointmentFilterSet


class AppointmentShipViewSet(viewsets.ModelViewSet):
    queryset = AppointmentShip.objects.all()
    serializer_class = AppointmentShipSerializer
    filter_class = AppointmentShipFilterSet
