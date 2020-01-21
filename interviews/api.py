from interviews.models import Plan
from rest_framework import viewsets, permissions
from .serializers import PlanSerializer

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
