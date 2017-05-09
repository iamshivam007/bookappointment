from django.contrib.auth.models import User
from rest_framework import serializers

from apps.core.models import StoreAdmin, Shopper, PersonalAssistant


class UserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, style={'input_type': 'password'})
    email = serializers.EmailField()

    class Meta:
        model = User
        exclude = (
            'password',
            'groups',
            'user_permissions',
            'last_login',
            'is_superuser',
            'date_joined',
            'is_staff',
            'is_active'
        )

    def validate(self, attrs):
        if attrs.get('password1') != attrs.get('password2'):
            return serializers.ValidationError('password must be same')
        return attrs

    def save(self, request):
        phone_number = request.data.get('phone_number')
        role = request.data.get('role')
        validated_data = dict(username=request.data['username'], email=request.data['username'])
        validated_data['password'] = request.data['password1']
        validated_data['first_name'] = request.data['first_name']
        validated_data['last_name'] = request.data['last_name']
        user = User.objects.create_user(**validated_data)
        StoreAdmin.objects.get_or_create(user=user, phone_number=phone_number)
        Shopper.objects.get_or_create(user=user, phone_number=phone_number)
        PersonalAssistant.objects.get_or_create(user=user, phone_number=phone_number)
        return user
