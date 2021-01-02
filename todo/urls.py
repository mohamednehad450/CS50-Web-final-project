from django.urls import path, re_path, include
from . import views

urlpatterns = [
    # Catch all: serves React frontend
    path('', views.frontend),
    path('app/', views.frontend),
    re_path(r'^app/.*/$', views.frontend),
]
