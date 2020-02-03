from interviews.models import Plan
from interviews.models import Component
from interviews.models import Group
from interviews.models import Participant
from rest_framework import viewsets, permissions
from .serializers import PlanSerializer
from .serializers import ParticipantSerializer
from .serializers import ComponentSerializer
from .serializers import GroupSerializer

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

