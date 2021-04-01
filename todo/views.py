from .models import Todo, Step, Tag, PomodoroInterval, Habit, HabitEntry
import os

from django.shortcuts import get_object_or_404
from django.conf import settings
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.utils import timezone

from rest_framework import permissions, authentication, viewsets, response
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.settings import api_settings


from .serializers import TagSerializer, TodoSerializer, StepSerializer, UserSerializer, PomodoroSerializer, HabitSerializer, HabitEntrySerializer


# Create your views here.

def frontend(request):
    try:
        with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
            return HttpResponse(f.read())
    except FileNotFoundError:
        print('Production build of app not found')
        return HttpResponse(
            """
            This URL is only used when you have built the production
            version of the app. Visit http://localhost:3000/ instead, or
            run `yarn run build` to test the production version.
            """,
            status=501,
        )


class TodoViewSet(viewsets.ViewSet):

    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(user=user).order_by('-date').all()

    def list(self, request):
        serializer = TodoSerializer(self.get_queryset(), many=True)
        return response.Response(serializer.data)

    def create(self, request):
        ser = TodoSerializer(
            data={**request.data, 'user': request.user.id}
        )
        if (ser.is_valid()):
            todo = ser.save()
            data = TodoSerializer(todo).data
            return response.Response(data)
        else:
            return response.Response(ser._errors, status=400)

    def retrieve(self, request, pk=None):
        try:
            todo = get_object_or_404(Todo, user=request.user,  pk=pk)
            data = TodoSerializer(todo).data
            return response.Response(data)
        except ValidationError as err:
            return response.Response({"id": [f"'{pk}' is not a valid Todo ID"]}, status=400)

    def partial_update(self, request, pk=None):
        try:
            todo = get_object_or_404(Todo, user=request.user,  pk=pk)
            ser = TodoSerializer(todo, data=request.data, partial=True)
            if ser.is_valid():
                todo = ser.save()
                data = TodoSerializer(todo).data
                return response.Response(data)
            else:
                return response.Response(ser._errors)
        except ValidationError:
            return response.Response({"id": [f"'{pk}' is not a valid Todo ID"]}, status=400)

    def destroy(self, request, pk=None):
        try:
            todo = get_object_or_404(Todo, user=request.user,  pk=pk)
            todo.delete()
            return response.Response(status=200)
        except ValidationError:
            return response.Response({"id": [f"'{pk}' is not a valid Todo ID"]}, status=400)

    @action(methods=['post'], detail=True)
    def check_todo(self, request, pk=None):
        try:
            todo = get_object_or_404(Todo, user=request.user,  pk=pk)
            if (todo.checked is not None):
                todo.checked = None
            else:
                todo.checked = timezone.now()
            todo.save()
            return response.Response({'checked': todo.checked}, status=200)
        except ValidationError:
            return response.Response({"id": [f"'{pk}' is not a valid Todo ID"]}, status=400)

    @action(methods=['post'], detail=True)
    def check_step(self, request, pk=None):
        try:
            todo = get_object_or_404(Todo, user=request.user,  pk=pk)

            stepPk = request.data.get('stepId', None)
            step = get_object_or_404(Step,  pk=stepPk, todo=todo)

            if todo.user.id == request.user.id:
                if step.checked is not None:
                    step.checked = None
                else:
                    step.checked = timezone.now()
                step.save()
                return response.Response({'checked': step.checked}, status=200)
            else:
                return response.Response({'details': 'Not Found'}, status=404)
        except ValidationError:
            return response.Response({"id": [f"'{pk}' is not a valid ID"]}, status=400)


class TagViewSet(viewsets.ViewSet):

    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Tag.objects.filter(user=user).all()

    def list(self, request):
        serializer = TagSerializer(self.get_queryset(), many=True)
        return response.Response(serializer.data)

    def create(self, request):
        data = request.data
        ser = TagSerializer(
            data={**request.data, 'user': request.user.id}
        )
        if (ser.is_valid()):
            tag = ser.save()
            data = TagSerializer(tag).data
            return response.Response(data)
        else:
            return response.Response(ser._errors, status=400)

    def retrieve(self, request, pk=None):
        try:
            tag = get_object_or_404(Tag, user=request.user,  pk=pk)
            data = TagSerializer(tag).data
            return response.Response(data)
        except ValidationError:
            return response.Response({"id": [f'"{pk}" is not a valid Tag ID']}, status=400)

    def destroy(self, request, pk=None):
        try:
            tag = get_object_or_404(Tag, user=request.user,  pk=pk)
            tag.delete()
            return response.Response(status=200)
        except ValidationError:
            return response.Response({"id": [f"'{pk}' is not a valid Tag ID"]}, status=400)

    def partial_update(self, request, pk=None):
        try:
            tag = get_object_or_404(Tag, user=request.user,  pk=pk)
            ser = TagSerializer(tag, data=request.data, partial=True)
            if ser.is_valid():
                tag = ser.save()
                data = TagSerializer(tag).data
                return response.Response(data)
            else:
                return response.Response(ser._errors)
        except ValidationError:
            return response.Response({"id": [f"'{pk}' is not a valid Tag ID"]}, status=400)


class PomodoroViewSet(viewsets.ViewSet):

    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return PomodoroInterval.objects.filter(user=user).all()

    def list(self, request):
        serializer = PomodoroSerializer(self.get_queryset(), many=True)
        return response.Response(serializer.data)

    def create(self, request):
        data = request.data
        ser = PomodoroSerializer(data=data)
        if (ser.is_valid()):
            interval = PomodoroInterval.objects.create(
                **ser.validated_data, user=request.user)
            interval.save()
            return response.Response(PomodoroSerializer(interval).data)
        else:
            return response.Response(ser._errors, status=400)

    def retrieve(self, request, pk=None):
        try:
            interval = get_object_or_404(
                PomodoroInterval, user=request.user,  pk=pk)
            data = PomodoroSerializer(interval).data
            return response.Response(data)
        except ValidationError:
            return response.Response({"id": [f'"{pk}" is not a valid Tag ID']}, status=400)


class HabitViewSet(viewsets.ViewSet):

    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Habit.objects.filter(user=user).order_by('-created').all()

    def list(self, request):
        serializer = HabitSerializer(self.get_queryset(), many=True)
        return response.Response(serializer.data)

    def create(self, request):
        data = request.data
        serializer = HabitSerializer(data={**data, "user": request.user.id})
        if serializer.is_valid():
            habit = serializer.save()
            data = HabitSerializer(habit).data
            return response.Response(data)
        else:
            return response.Response(serializer._errors, status=400)

    def retrieve(self, request, pk=None):
        try:
            habit = get_object_or_404(
                Habit, user=request.user,  pk=pk)
            data = HabitSerializer(habit).data
            return response.Response(data)
        except ValidationError:
            return response.Response({"id": [f'"{pk}" is not a valid Habit ID']}, status=400)

    @action(methods=['post'], detail=True)
    def add_entry(self, request, pk=None):
        try:
            # getting habit
            habit = get_object_or_404(
                Habit, user=request.user, pk=pk
            )
            # Validating entry
            serializer = HabitEntrySerializer(data=request.data)
            if serializer.is_valid():
                # saving
                HabitEntry.objects.get_or_create(
                    **serializer.validated_data, habit=habit)
                return response.Response(status=200)
            else:
                return response.Response(serializer._errors, status=400)

        except ValidationError:
            return response.Response({"id": [f'"{pk}" is not a valid Habit ID']}, status=400)

    @action(methods=['post'], detail=True)
    def remove_entry(self, request, pk=None):
        try:
            habit = get_object_or_404(
                Habit, user=request.user, pk=pk
            )
            serializer = HabitEntrySerializer(data=request.data)
            if serializer.is_valid():
                entry = HabitEntry.objects.get(
                    **serializer.validated_data, habit=habit)
                if entry is not None:
                    entry.delete()
                return response.Response(status=201)
            else:
                return response.Response(serializer._errors, status=400)
        except ValidationError:
            return response.Response({"id": [f'"{pk}" is not a valid Habit ID']}, status=400)

    def partial_update(self, request, pk=None):
        try:
            habit = get_object_or_404(
                Habit, user=request.user,  pk=pk)
            serializer = HabitSerializer(
                data=request.data, instance=habit, partial=True)
            if serializer.is_valid():
                habit = serializer.save()
                data = HabitSerializer(habit).data
                return response.Response(data)
            else:
                return response.Response(serializer._errors, status=400)
        except ValidationError:
            return response.Response({"id": [f'"{pk}" is not a valid Habit ID']}, status=400)

    def destroy(self, request, pk=None):
        try:
            habit = get_object_or_404(Habit, user=request.user,  pk=pk)
            habit.delete()
            return response.Response(status=200)
        except ValidationError:
            return response.Response({"id": [f"'{pk}' is not a valid Habit ID"]}, status=400)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def create_auth(request):
    ser = UserSerializer(data=request.data)
    if ser.is_valid():
        user = ser.save()

        # Manually creating auth token
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)

        return response.Response({'token': token}, status=201)
    else:
        return response.Response(ser._errors, status=400)
