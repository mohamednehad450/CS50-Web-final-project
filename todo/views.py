import os

from django.shortcuts import get_object_or_404
from django.conf import settings
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.models import Q

from rest_framework import permissions, authentication, viewsets, response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_jwt.views import obtain_jwt_token

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

    def get_queryset(self, request):
        user = self.request.user
        return Todo.objects.filter(user=user).order_by('-date').all()

    def list(self, request):
        serializer = TodoSerializer(self.get_queryset(request), many=True)
        return response.Response(serializer.data)

    def create(self, request):
        data = {**request.data, 'user': request.user.id}
        ser = TodoSerializer(data=data)
        if (ser.is_valid()):
            ser.save()
            ser.validated_data.pop('user')
            return response.Response(ser.validated_data)
        else:
            return response.Response({'details': 'bad request', **ser._errors}, status=400)

    def retrieve(self, request, pk=None):
        todo = get_object_or_404(Todo, user=request.user,  pk=pk)
        data = TodoSerializer(todo).data
        return response.Response(data)

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk=None):
        todo = get_object_or_404(Todo, user=request.user,  pk=pk)
        serializer = TodoSerializer(todo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            data = serializer.data
            del data['user']
            return response.Response(data)
        else:
            return response.Response(ser._errors)

    def destroy(self, request, pk=None):
        todo = get_object_or_404(Todo, user=request.user,  pk=pk)
        todo.delete()
        return response.Response(status=200)


class TagViewSet(viewsets.ViewSet):

    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self, request):
        user = self.request.user
        return Tag.objects.filter(Q(user=user) | Q(user=None)).order_by('user').all()

    def list(self, request):
        serializer = TagSerializer(self.get_queryset(request), many=True)
        return response.Response(serializer.data)

    def create(self, request):
        data = request.data
        t = TagSerializer(data=data)
        if (t.is_valid()):
            tag = Tag.objects.create(**t.validated_data, user=request.user)
            tag.save()
            return response.Response(t.validated_data)
        else:
            return response.Response({'details': 'bad request'}, status=400)

    def retrieve(self, request, pk=None):
        tag = get_object_or_404(Tag, user=request.user,  pk=pk)
        data = TodoSerializer(todo).data
        return response.Response(data)

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass


class StepViewSet(viewsets.ViewSet):

    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        pass

    def create(self, request):
        pass

    def retrieve(self, request, pk=None):
        pass

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk=None):
        step = get_object_or_404(Step,  pk=pk)
        if step.todo.user == request.user:
            step.__dict__.update(request.data)
            step.save()
            data = StepSerializer(step).data
            return response.Response(data)
        else:
            return response.Response({'details': 'forbidden'}, status=403)

    def destroy(self, request, pk=None):
        pass


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def create_auth(request):
    user = UserSerializer(data=request.data)
    if user.is_valid():
        data = user.validated_data
        user = User.objects.create(
            username=data['username'])
        user.set_password(data['password'])
        user.save()
        return response.Response(status=201)
    else:
        return response.Response(serialized._errors, status=400)
