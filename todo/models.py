import uuid
from django.db import models
from django.contrib.auth.models import User

# Create your models here.


def get_default_tag():
    return Tag.objects.get(label='None')


class Tag(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True, related_name="tags")
    color = models.CharField(max_length=7)
    label = models.CharField(max_length=64)


class Todo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='todos')
    title = models.CharField(max_length=150, unique=True)
    checked = models.BooleanField(default=False)
    tag = models.ForeignKey(Tag, on_delete=models.SET_DEFAULT,
                            default=get_default_tag)
    dueDate = models.DateTimeField(blank=True, null=True, )
    date = models.DateTimeField()


class Step(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=150)
    dueDate = models.DateTimeField(blank=True, null=True)
    checked = models.BooleanField(default=False)
    todo = models.ForeignKey(Todo, related_name='steps',
                             on_delete=models.CASCADE)
