from django.contrib.auth.models import User
from .models import CustomUser
from rest_framework import serializers
import re

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'password', 'email', 'organizations')
        extra_kwargs = {'password': {'write_only': True}}

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError('Password must be at least 8 characters long.')
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError('Password must contain at least one uppercase letter.')
        if not re.search(r'[a-z]', value):
            raise serializers.ValidationError('Password must contain at least one lowercase letter.')
        if not re.search(r'\d', value):
            raise serializers.ValidationError('Password must contain at least one number.')
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', value):
            raise serializers.ValidationError('Password must contain at least one symbol.')
        return value

    def validate(self, data):
        # Check that all required fields are present
        required_fields = ['username', 'password', 'email', 'organizations']
        for field in required_fields:
            if field not in data or not data[field]:
                raise serializers.ValidationError({field: 'This field is required.'})

        # Validate the password
        self.validate_password(data.get('password', ''))
        
        return data

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            organizations=validated_data['organizations']
        )
        return user
