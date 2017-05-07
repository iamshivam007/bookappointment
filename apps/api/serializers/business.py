from rest_framework import serializers

from apps.core.models import Store


class StoreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Store
