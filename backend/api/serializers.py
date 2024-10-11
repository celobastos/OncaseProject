from rest_framework import serializers
from .models import Participant, Project, Participation

class ParticipantSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = Participant
        fields = ['id', 'first_name', 'last_name', 'full_name']

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"

class ProjectSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name']

class ParticipationSerializer(serializers.ModelSerializer):
    participant = ParticipantSerializer(read_only=True)
    participant_id = serializers.PrimaryKeyRelatedField(
        queryset=Participant.objects.all(),
        source='participant',
        write_only=True
    )
    project = ProjectSimpleSerializer(read_only=True)
    project_id = serializers.PrimaryKeyRelatedField(
        queryset=Project.objects.all(),
        source='project',
        write_only=True
    )
    percentage = serializers.FloatField(required=False, allow_null=True)

    class Meta:
        model = Participation
        fields = ['id', 'participant', 'participant_id', 'project', 'project_id', 'percentage']

class ProjectSerializer(serializers.ModelSerializer):
    participations = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'name', 'participations']

    def get_participations(self, obj):
        participations = Participation.objects.filter(project=obj)
        return ParticipationSerializer(participations, many=True).data
