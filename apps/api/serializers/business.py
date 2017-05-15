from rest_framework import serializers, fields

from apps.core.models.business import *
from utils.utils import values_from_queryset
from utils.choices import WEEK_DAYS_CHOICES


class StoreSerializer(serializers.ModelSerializer):
    service_detail = serializers.SerializerMethodField()
    working_days = fields.MultipleChoiceField(choices=WEEK_DAYS_CHOICES)

    class Meta:
        model = Store

    def get_service_detail(self, store):
        return map(values_from_queryset, store.services.all().values("name"))


class StoreAdminSerializer(serializers.ModelSerializer):

    class Meta:
        model = StoreAdmin


class SkillSerializer(serializers.ModelSerializer):

    class Meta:
        model = Skill


class RoleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Role


class SkillRoleRelationSerializer(serializers.ModelSerializer):

    class Meta:
        model = SkillRoleRelation


class ServiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Service
