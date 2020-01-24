from rest_framework import serializers
from interviews.models import Plan
from interviews.models import Component
from interviews.models import Participant

# Plan Serializer
class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = '__all__'

# Component Serializer
class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = '__all__'


# Participant Serializer
class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = '__all__'
        