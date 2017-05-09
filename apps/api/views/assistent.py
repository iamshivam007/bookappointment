from rest_framework import viewsets

from apps.api.serializers.assistent import *
from utils.filters import *


class PersonalAssistantViewSet(viewsets.ModelViewSet):
    queryset = PersonalAssistant.objects.all()
    serializer_class = PersonalAssistantSerializer
    filter_class = PersonalAssistantFilterSet


class ServiceSubscriptionViewSet(viewsets.ModelViewSet):
    queryset = ServiceSubscription.objects.all()
    serializer_class = ServiceSubscriptionSerializer
    filter_class = ServiceSubscriptionFilterSet


class RoleSubscriptionViewSet(viewsets.ModelViewSet):
    queryset = RoleSubscription.objects.all()
    serializer_class = RoleSubscriptionSerializer
    filter_class = RoleSubscriptionFilterSet


class StoreSubscriptionViewSet(viewsets.ModelViewSet):
    queryset = StoreSubscription.objects.all()
    serializer_class = StoreSubscriptionSerializer
    filter_class = StoreSubscriptionFilterSet
