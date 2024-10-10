from rest_framework import viewsets
from .models import Participant, Project, Participation
from .serializers import ParticipantSerializer, ProjectSerializer, ParticipationSerializer

class ParticipantViewSet(viewsets.ModelViewSet):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ParticipationViewSet(viewsets.ModelViewSet):
    queryset = Participation.objects.select_related('participant', 'project').all()
    serializer_class = ParticipationSerializer