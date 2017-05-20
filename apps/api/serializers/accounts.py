from django.contrib.auth.models import User
from rest_framework import serializers

from apps.core.models import Shopper, PersonalAssistant, StoreAdmin
from utils.message import USER_ALREADY_EXIST_ERROR_MSG


class UserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, style={'input_type': 'password'})
    email = serializers.EmailField()
    roles = serializers.SerializerMethodField()

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

    def get_roles(self, user):
        if StoreAdmin.objects.filter(user=user):
            return ['Store Admin', 'Shopper', 'Personal Assistant']
        return ['Shopper', 'Personal Assistant']

    def validate_email(self, email):
        if User.objects.filter(email=email):
            raise serializers.ValidationError(USER_ALREADY_EXIST_ERROR_MSG)
        return email

    def validate(self, attrs):
        if attrs.get('password1') != attrs.get('password2'):
            return serializers.ValidationError('password must be same')
        return attrs

    def save(self, request):
        phone_number = request.data.get('phone_number')
        role = request.data.get('role')
        validated_data = dict(username=request.data['username'], email=request.data['email'])
        validated_data['password'] = request.data['password1']
        validated_data['first_name'] = request.data.get('first_name')
        user = User.objects.create_user(**validated_data)
        Shopper.objects.get_or_create(user=user, phone_number=phone_number)
        PersonalAssistant.objects.get_or_create(user=user, phone_number=phone_number)
        return user
