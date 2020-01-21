from rest_framework import serializers
from interviews.models import Plan

# Plan Serializer
class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = '__all__'
        