from rest_framework import routers
from .api import PlanViewSet
from .api import ComponentViewSet
from .api import GroupViewSet
from .api import ParticipantViewSet
from .api import ResponseViewSet

router = routers.DefaultRouter()
router.register('api/plans', PlanViewSet, 'plans')
router.register('api/components', ComponentViewSet, 'components')
router.register('api/groups', GroupViewSet, 'groups')
router.register('api/participants', ParticipantViewSet, 'participants')
router.register('api/responses', ResponseViewSet, 'responses')

urlpatterns = router.urls