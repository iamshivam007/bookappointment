from rest_framework import serializers

from apps.core.models.business import *


class StoreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Store


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
