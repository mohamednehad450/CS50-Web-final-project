import uuid
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.


class Tag(models.Model):

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'label'], name="unique_tag_title")
        ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="tags")
    color = models.CharField(max_length=7)
    label = models.CharField(max_length=64)


class Todo(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'title'], name="unique_todo_title")
        ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='todos')
    title = models.CharField(max_length=150)
    checked = models.DateTimeField(null=True, blank=True)
    tag = models.ForeignKey(Tag, null=True, on_delete=models.SET_NULL)
    dueDate = models.DateTimeField(blank=True, null=True)
    date = models.DateTimeField(default=timezone.now)


class Step(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=150)
    dueDate = models.DateTimeField(blank=True, null=True)
    checked = models.DateTimeField(null=True, blank=True)
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


class Habit(models.Model):

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'title'], name="unique_habit_title")
        ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="habits"
    )
    created = models.DateTimeField(default=timezone.now, editable=False)
    title = models.CharField(max_length=150)


class HabitEntry(models.Model):

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['habit', 'date'], name="unique_date")
        ]

    date = models.DateField()
    habit = models.ForeignKey(
        Habit, on_delete=models.CASCADE, related_name="entries")
