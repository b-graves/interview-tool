from interviews.models import Plan
from interviews.models import Component
from interviews.models import Group
from interviews.models import Participant
from interviews.models import Response
from interviews.models import BiasDeclaration
from interviews.models import BiasReflection
from interviews.models import Recording
from interviews.models import Note
from interviews.models import Theme
from interviews.models import Coding
from interviews.models import CodingType
from rest_framework import viewsets, permissions
from .serializers import PlanSerializer
from .serializers import ParticipantSerializer
from .serializers import ResponseSerializer
from .serializers import DeclarationSerializer
from .serializers import ReflectionSerializer
from .serializers import RecordingSerializer
from .serializers import ComponentSerializer
from .serializers import NoteSerializer
from .serializers import GroupSerializer
from .serializers import ThemeSerializer
from .serializers import CodingSerializer
from .serializers import CodingTypeSerializer

from rest_framework.decorators import api_view

# Plan Viewset
class PlanViewSet(viewsets.ModelViewSet):
    queryset = Plan.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = PlanSerializer

    def get_queryset(self):
        return self.request.user.plans.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    
    # def update(self, request, pk=None):
    #     instance = serializer.save(owner=self.request.user)

# Component Viewset
class ComponentViewSet(viewsets.ModelViewSet):
    queryset = Component.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ComponentSerializer

    def get_queryset(self):
        return self.request.user.components.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# Response Viewset
class ResponseViewSet(viewsets.ModelViewSet):
    queryset = Response.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ResponseSerializer

    def get_queryset(self):
        return self.request.user.responses.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# Declaration Viewset
class DeclarationViewSet(viewsets.ModelViewSet):
    queryset = BiasDeclaration.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = DeclarationSerializer

    def get_queryset(self):
        return self.request.user.bias_declarations.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# Reflection Viewset
class ReflectionViewSet(viewsets.ModelViewSet):
    queryset = BiasReflection.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ReflectionSerializer

    def get_queryset(self):
        return self.request.user.bias_reflections.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# Recording Viewset
class RecordingViewSet(viewsets.ModelViewSet):
    queryset = Recording.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = RecordingSerializer

    def get_queryset(self):
        return self.request.user.recordings.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# Group Viewset
class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = GroupSerializer

    def get_queryset(self):
        return self.request.user.component_groups.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# Participant Viewset
class ParticipantViewSet(viewsets.ModelViewSet):
    queryset = Participant.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ParticipantSerializer

    def get_queryset(self):
        return self.request.user.participants.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# Note Viewset
class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = NoteSerializer

    def get_queryset(self):
        return self.request.user.notes.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# Theme Viewset
class ThemeViewSet(viewsets.ModelViewSet):
    queryset = Theme.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ThemeSerializer

    def get_queryset(self):
        return self.request.user.themes.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# Coding Viewset
class CodingViewSet(viewsets.ModelViewSet):
    queryset = Coding.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CodingSerializer

    def get_queryset(self):
        return self.request.user.codings.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# CodingType Viewset
class CodingTypeViewSet(viewsets.ModelViewSet):
    queryset = CodingType.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CodingTypeSerializer

    def get_queryset(self):
        return self.request.user.coding_types.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)