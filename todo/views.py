import os

from django.shortcuts import get_object_or_404
from django.conf import settings
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

from rest_framework import permissions, authentication, viewsets, response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.settings import api_settings


from .serializers import TagSerializer, TodoSerializer, StepSerializer, UserSerializer
from .models import Todo, Step, Tag


# Create your views here.

def frontend(request):
    try:
        with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
            return HttpResponse(f.read())
    except FileNotFoundError:
        logging.exception('Production build of app not found')
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
            data=request.data,
            context={
                'user': request.user
            }
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
        ser = TagSerializer(data=data)
        if (ser.is_valid()):
            tag = Tag.objects.create(**ser.validated_data, user=request.user)
            tag.save()
            return response.Response(ser.validated_data)
        else:
            return response.Response(ser._errors, status=400)

    def retrieve(self, request, pk=None):
        try:
            tag = get_object_or_404(Tag, user=request.user,  pk=pk)
            data = TodoSerializer(todo).data
            return response.Response(data)
        except ValidationError:
            return response.Response({"id": [f'"{pk}" is not a valid Tag ID']}, status=400)


class StepViewSet(viewsets.ViewSet):

    permission_classes = [permissions.IsAuthenticated]

    def partial_update(self, request, pk=None):
        try:
            step = get_object_or_404(Step,  pk=pk)
            if step.todo.user == request.user:
                ser = StepSerializer(
                    instance=step, data=request.data, partial=True)
                if ser.is_valid():
                    step = ser.save()
                    data = StepSerializer(step).data
                    return response.Response(data)
                else:
                    return response.Response(ser._errors, status=400)
            else:
                return response.Response({'details': 'forbidden'}, status=403)
        except ValidationError:
            return response.Response({"id": [f"'{pk}' is not a valid Step ID"]}, status=400)


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
