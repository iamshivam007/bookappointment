from rest_framework import serializers

from apps.core.models.assistent import *
from utils.utils import Base64ImageField


class PersonalAssistantSerializer(serializers.ModelSerializer):
    image = Base64ImageField(required=False)

    class Meta:
        model = PersonalAssistant


class ServiceSubscriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = ServiceSubscription


class RoleSubscriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = RoleSubscription


class StoreSubscriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = StoreSubscription
