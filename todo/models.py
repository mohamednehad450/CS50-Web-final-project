import uuid
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.


def get_default_tag():
    return Tag.objects.get(label='None')


class Tag(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="tags")
    color = models.CharField(max_length=7)
    label = models.CharField(max_length=64)

    def serialize(self):
        return {
            'id': self.id,
            'color': self.color,
            'label': self.label,
        }


class Todo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='todos')
    title = models.CharField(max_length=150)
    checked = models.BooleanField(default=False)
    tag = models.ForeignKey(Tag, null=True, on_delete=models.SET_NULL)
    dueDate = models.DateTimeField(blank=True, null=True)
    date = models.DateTimeField(default=timezone.now)

    def serialize(self):
        tag = self.tag
        if self.tag is not None:
            tag = tag.id

        return {
            'id': self.id,
            'title': self.title,
            'checked': self.checked,
            'dueDate': self.dueDate,
            'date': self.date,
            'tag': tag
        }


class Step(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=150)
    dueDate = models.DateTimeField(blank=True, null=True)
    checked = models.BooleanField(default=False)
    todo = models.ForeignKey(Todo, related_name='steps',
                             on_delete=models.CASCADE)
