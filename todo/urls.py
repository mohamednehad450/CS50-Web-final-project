from django.urls import path, re_path, include
from . import views

urlpatterns = [
    # Catch all: serves React frontend
    path('', views.frontend),
    re_path(r'^.*/$', views.frontend),
]
