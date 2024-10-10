from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ParticipantViewSet, ProjectViewSet, ParticipationViewSet

router = DefaultRouter()
router.register(r'participants', ParticipantViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'participations', ParticipationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]