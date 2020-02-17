from rest_framework import routers
from .api import PlanViewSet
from .api import ComponentViewSet
from .api import GroupViewSet
from .api import ParticipantViewSet
from .api import ResponseViewSet
from .api import RecordingViewSet

from django.contrib import admin
from django.urls import path

router = routers.DefaultRouter()
router.register('api/plans', PlanViewSet, 'plans')
router.register('api/components', ComponentViewSet, 'components')
router.register('api/groups', GroupViewSet, 'groups')
router.register('api/participants', ParticipantViewSet, 'participants')
router.register('api/responses', ResponseViewSet, 'responses')
router.register('api/recordings', RecordingViewSet, 'recordings')

urlpatterns = router.urls + [path('admin/', admin.site.urls)]