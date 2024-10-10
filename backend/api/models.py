from django.db import models

class Participant(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Project(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Participation(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    percentage = models.FloatField()

    def __str__(self):
        return f"{self.participant} - {self.project} ({self.percentage}%)"
