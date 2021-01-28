import uuid
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from .models import Tag, Todo, Step


class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = ['id', 'title', 'dueDate', 'checked']

    id = serializers.UUIDField(default=uuid.uuid4)


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'label', 'color']

    id = serializers.UUIDField(default=uuid.uuid4)


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'title', 'checked',
                  'tag', 'dueDate', 'steps', 'date']

    steps = StepSerializer(many=True, required=False)
    date = serializers.DateTimeField(default=timezone.now, read_only=True)

    def update(self, instance, validated_data):

        # Premitives
        title = validated_data.get('title', instance.title)
        instance.title = title
        checked = validated_data.get('checked', instance.checked)
        instance.checked = checked
        dueDate = validated_data.get('dueDate', instance.dueDate)
        instance.dueDate = dueDate
        tag = validated_data.get('tag', instance.tag)
        instance.tag = tag

        steps = validated_data.get('steps', [])
        if len(steps) > 0:
            Step.objects.filter(todo=instance).delete()
            new_steps = []
            for step in steps:
                new_steps.append(Step(**step, todo=instance))
            Step.objects.bulk_create(new_steps)

        instance.save()
        return instance

    def create(self, validated_data):

        steps = validated_data.get('steps', None)
        if steps is not None:
            del validated_data['steps']
        else:
            steps = []

        print(validated_data)
        todo = Todo.objects.create(
            **validated_data, user=self.context.get('user', None))

        new_steps = []
        for step in steps:
            new_steps.append(Step(**step, todo=todo))

        Step.objects.bulk_create(new_steps)

        return todo


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {
            'password': {
                'validators': [validate_password],
                'write_only': True
            }
        }

    def create(self, validated_data):
        username = validated_data.get('username', '')
        password = validated_data.get('password', '')
        user = User.objects.create(username=username)
        user.set_password(password)
        user.save()
        return user
