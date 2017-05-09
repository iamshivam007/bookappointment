from rest_framework import viewsets

from apps.api.serializers.business import *
from utils.filters import *

__all__ = [
    'StoreAdminViewSet',
    'StoreViewSet',
    'ServiceViewSet',
    'SkillViewSet',
    'RoleViewSet',
    'SkillRoleRelationViewSet'
]


class StoreAdminViewSet(viewsets.ModelViewSet):
    queryset = StoreAdmin.objects.all()
    serializer_class = StoreAdminSerializer
    filter_class = StoreAdminFilterSet


class StoreViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    filter_class = StoreFilterSet


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    filter_class = ServiceFilterSet


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    filter_class = SkillFilterSet


class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    filter_class = RoleFilterSet


class SkillRoleRelationViewSet(viewsets.ModelViewSet):
    queryset = SkillRoleRelation.objects.all()
    serializer_class = SkillRoleRelationSerializer
    filter_class = SkillRoleRelationFilterSet
