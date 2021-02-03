"""final URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include


from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from todo.views import TodoViewSet, TagViewSet, StepViewSet, PomodoroViewSet, create_auth

router = routers.DefaultRouter()
router.register(r'todos', TodoViewSet, basename='todo')
router.register(r'tags', TagViewSet, basename='tag')
router.register(r'steps', StepViewSet, basename='step')
router.register(r'pomodoros', PomodoroViewSet, basename='pomodoro')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/auth/create_auth', create_auth),
    path('api/auth/get_token', obtain_jwt_token),
    path('api/auth/refresh_token', refresh_jwt_token),
    path('admin/', admin.site.urls),
    # must be last: contains catch all path
    path('', include('todo.urls')),
]
