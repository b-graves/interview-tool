from rest_framework import routers
from .api import PlanViewSet
from .api import ComponentViewSet

router = routers.DefaultRouter()
router.register('api/plans', PlanViewSet, 'plans')
router.register('api/components', ComponentViewSet, 'components')

urlpatterns = router.urls