from rest_framework import routers
from .api import PlanViewSet
from .api import ComponentViewSet
from .api import GroupViewSet
from .api import ParticipantViewSet
from .api import ResponseViewSet
from .api import DeclarationViewSet
from .api import ReflectionViewSet
from .api import RecordingViewSet
from .api import NoteViewSet
from .api import ThemeViewSet
from .api import CodingViewSet
from .api import CodingTypeViewSet

from django.contrib import admin
from django.urls import path

from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register('api/plans', PlanViewSet, 'plans')
router.register('api/components', ComponentViewSet, 'components')
router.register('api/groups', GroupViewSet, 'groups')
router.register('api/participants', ParticipantViewSet, 'participants')
router.register('api/responses', ResponseViewSet, 'responses')
router.register('api/declarations', DeclarationViewSet, 'declarations')
router.register('api/reflections', ReflectionViewSet, 'reflections')
router.register('api/recordings', RecordingViewSet, 'recordings')
router.register('api/notes', NoteViewSet, 'notes')
router.register('api/themes', ThemeViewSet, 'themes')
router.register('api/codings', CodingViewSet, 'codings')
router.register('api/codingtypes', CodingTypeViewSet, 'codingtypes')


urlpatterns = router.urls + [path('admin/', admin.site.urls)] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)