from rest_framework import routers
from .api import PlanViewSet

router = routers.DefaultRouter()
router.register('api/plans', PlanViewSet, 'plans')

urlpatterns = router.urls