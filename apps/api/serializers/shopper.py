from rest_framework import serializers

from apps.api.serializers.accounts import UserSerializer
from apps.api.serializers.business import StoreSerializer, ServiceSerializer
from apps.core.models.shopper import *


class ShopperSerializer(serializers.ModelSerializer):
    user_detail = serializers.SerializerMethodField()

    class Meta:
        model = Shopper

    def get_user_detail(self, shopper):
        return UserSerializer(shopper.user).data


class RegistrySerializer(serializers.ModelSerializer):
    shopper = serializers.HiddenField(default='')
    shopper_detail = serializers.SerializerMethodField()

    class Meta:
        model = Registry

    def get_shopper_detail(self, registry):
        return ShopperSerializer(registry.shopper).data

    def validate_shopper(self, shopper):
        return Shopper.objects.get(user=self.context.get('request').user)


class AppointmentSerializer(serializers.ModelSerializer):
    shopper = serializers.HiddenField(default='')
    shopper_detail = serializers.SerializerMethodField()
    store_detail = serializers.SerializerMethodField()
    service_detail = serializers.SerializerMethodField()

    class Meta:
        model = Appointment

    def get_shopper_detail(self, appointment):
        return ShopperSerializer(appointment.shopper).data

    def get_store_detail(self, appointment):
        return StoreSerializer(appointment.store).data

    def get_service_detail(self, appointment):
        return ServiceSerializer(appointment.service).data

    def validate_shopper(self, shopper):
        return Shopper.objects.get(user=self.context.get('request').user)


class AppointmentShipSerializer(serializers.ModelSerializer):

    class Meta:
        model = AppointmentShip
