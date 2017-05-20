from rest_framework import serializers

from apps.core.models.assistent import *
from utils.utils import Base64ImageField
from apps.api.serializers import RoleSerializer, UserSerializer, ServiceSerializer


class PersonalAssistantSerializer(serializers.ModelSerializer):
    user_detail = serializers.SerializerMethodField()
    image = Base64ImageField(required=False)

    class Meta:
        model = PersonalAssistant

    def get_user_detail(self, personal_assistant):
        return UserSerializer(personal_assistant.user).data


class ServiceSubscriptionSerializer(serializers.ModelSerializer):
    personal_assistant_detail = serializers.SerializerMethodField()
    service_detail = serializers.SerializerMethodField()

    class Meta:
        model = ServiceSubscription

    def get_personal_assistant_detail(self, service_subscription):
        return PersonalAssistantSerializer(service_subscription.personal_assistant).data

    def get_service_detail(self, service_subscription):
        return ServiceSerializer(service_subscription.service).data


class RoleSubscriptionSerializer(serializers.ModelSerializer):
    personal_assistant_detail = serializers.SerializerMethodField()
    role_detail = serializers.SerializerMethodField()

    class Meta:
        model = RoleSubscription

    def get_personal_assistant_detail(self, role_subscription):
        return PersonalAssistantSerializer(role_subscription.personal_assistant).data

    def get_role_detail(self, role_subscription):
        return RoleSerializer(role_subscription.role).data


class StoreSubscriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = StoreSubscription
