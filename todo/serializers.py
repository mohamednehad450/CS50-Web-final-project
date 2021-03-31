import uuid
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from .models import Tag, Todo, Step, PomodoroInterval, Habit, HabitEntry


class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = ['id', 'title', 'dueDate', 'checked']

    id = serializers.UUIDField(default=uuid.uuid4)


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'user', 'label', 'color']
        validators = [
            UniqueTogetherValidator(
                queryset=Tag.objects.all(),
                fields=['label', 'user'],
                message="Tag already exist.",
            )
        ]
        extra_kwargs = {
            'user': {
                'write_only': True
            },
        }

    id = serializers.UUIDField(default=uuid.uuid4)


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'title', 'checked',
                  'tag', 'dueDate', 'steps', 'date', 'user']
        extra_kwargs = {
            'user': {
                'write_only': True
            },
        }
        validators = [
            UniqueTogetherValidator(
                queryset=Todo.objects.all(),
                fields=['title', 'user'],
                message="Todo already exist.",
            )
        ]

    steps = StepSerializer(many=True, required=False)
    date = serializers.DateTimeField(default=timezone.now, read_only=True)

    def update(self, instance, validated_data):

        # Premitives
        title = validated_data.get('title', instance.title)
        instance.title = title
        checked = validated_data.get('checked', None)
        instance.checked = checked
        dueDate = validated_data.get('dueDate', None)
        instance.dueDate = dueDate
        tag = validated_data.get('tag', None)
        instance.tag = tag

        steps = validated_data.get('steps', None)
        if steps is not None:
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

        todo = Todo.objects.create(**validated_data)

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


class PomodoroSerializer(serializers.ModelSerializer):

    class Meta:
        model = PomodoroInterval
        fields = ['id', 'todo', 'startDate', 'endDate', 'defaultDuration']

    id = serializers.UUIDField(default=uuid.uuid4)


class HabitEntrySerializer(serializers.ModelSerializer):

    class Meta:
        model = HabitEntry
        fields = ['date']

    def to_representation(self, instance):
        return str(instance.date)


class HabitSerializer(serializers.ModelSerializer):

    class Meta:
        model = Habit
        fields = ['id', 'user', 'created', 'title', 'entries']
        extra_kwargs = {
            'user': {
                'write_only': True
            },
        }
        validators = [
            UniqueTogetherValidator(
                queryset=Habit.objects.all(),
                fields=['title', 'user'],
                message="Habit already exist.",
            )
        ]

    id = serializers.UUIDField(default=uuid.uuid4)

    entries = HabitEntrySerializer(many=True, required=False, read_only=True)
