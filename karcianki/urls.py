"""ioproject URL Configuration"""

from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('stworz/', views.host, name='host'),
    path('poker/', views.poker, name='poker'),
]