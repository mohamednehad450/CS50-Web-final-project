from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Tag, Todo, Step


class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = ['id', 'title', 'dueDate', 'checked']

    id = serializers.UUIDField()


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'label', 'color']

    id = serializers.UUIDField()


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'title', 'checked', 'tag', 'dueDate', 'steps', 'date']
    tag = TagSerializer()
    steps = StepSerializer(many=True)

    id = serializers.UUIDField()
