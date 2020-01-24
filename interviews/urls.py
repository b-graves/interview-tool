from rest_framework import routers
from .api import PlanViewSet
from .api import ComponentViewSet
from .api import ParticipantViewSet

router = routers.DefaultRouter()
router.register('api/plans', PlanViewSet, 'plans')
router.register('api/components', ComponentViewSet, 'components')
router.register('api/participants', ParticipantViewSet, 'participants')

urlpatterns = router.urls