import uuid
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.


class Tag(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="tags")
    color = models.CharField(max_length=7)
    label = models.CharField(max_length=64)


class Todo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='todos')
    title = models.CharField(max_length=150)
    checked = models.BooleanField(default=False)
    tag = models.ForeignKey(Tag, null=True, on_delete=models.SET_NULL)
    dueDate = models.DateTimeField(blank=True, null=True)
    date = models.DateTimeField(default=timezone.now)


class Step(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=150)
    dueDate = models.DateTimeField(blank=True, null=True)
    checked = models.BooleanField(default=False)
    todo = models.ForeignKey(Todo, related_name='steps',
                             on_delete=models.CASCADE)


class PomodoroInterval(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='intervals')
    startDate = models.DateTimeField()
    endDate = models.DateTimeField()
    defaultDuration = models.IntegerField()
    todo = models.ForeignKey(
        Todo, on_delete=models.CASCADE, related_name="intervals", null=True)
