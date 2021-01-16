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
        fields = ['id', 'user', 'title', 'checked',
                  'tag', 'dueDate', 'steps', 'date']

    tag = TagSerializer()
    steps = StepSerializer(many=True)

    id = serializers.UUIDField()

    def update(self, instance, validated_data):

        # Premitives
        title = validated_data.get('title', instance.title)
        instance.title = title
        checked = validated_data.get('checked', instance.checked)
        instance.checked = checked
        dueDate = validated_data.get('dueDate', instance.dueDate)
        instance.dueDate = dueDate

        # Forgin Objects
        tag = validated_data.get('tag')
        if tag is not None:
            tag = Tag.objects.get_or_create(**tag)
            instance.tag = tag[0]

        steps = validated_data.get('steps')
        if steps is not None:
            Step.objects.filter(todo=instance).delete()
            new_steps = []
            for step in steps:
                new_steps.append(Step(**step, todo=instance))
            Step.objects.bulk_create(new_steps)

        instance.save()
        return instance

    def create(self, validated_data):

        steps = validated_data.pop('steps')

        tag = validated_data.pop('tag')
        tag = Tag.objects.get_or_create(**tag)

        todo = Todo.objects.create(
            **validated_data, tag=tag[0])

        new_steps = []
        for step in steps:
            new_steps.append(Step(**step, todo=todo))

        Step.objects.bulk_create(new_steps)

        return todo


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
