from interviews.models import Plan
from interviews.models import Component
from rest_framework import viewsets, permissions
from .serializers import PlanSerializer
from .serializers import ComponentSerializer

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

