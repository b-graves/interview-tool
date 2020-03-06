from rest_framework import serializers
from interviews.models import Plan
from interviews.models import Component
from interviews.models import Note
from interviews.models import Group
from interviews.models import Response
from interviews.models import BiasDeclaration
from interviews.models import BiasReflection
from interviews.models import Recording
from interviews.models import Participant
from interviews.models import Theme
from interviews.models import Coding
from interviews.models import CodingType

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

# Group Serializer
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'

# Response Serializer
class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Response
        fields = '__all__'

# Declaration Serializer
class DeclarationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BiasDeclaration
        fields = '__all__'

# Reflection Serializer
class ReflectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BiasReflection
        fields = '__all__'

# Recording Serializer
class RecordingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recording
        fields = '__all__'

# Participant Serializer
class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = '__all__'

# Note Serializer
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

# Theme Serializer
class ThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theme
        fields = '__all__'

# CodingType Serializer
class CodingTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodingType
        fields = '__all__'

# Coding Serializer
class CodingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coding
        fields = '__all__'