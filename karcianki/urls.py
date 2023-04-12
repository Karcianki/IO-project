"""ioproject URL Configuration"""

from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('stworz/', views.host, name='host'),
    path('graj/', views.play, name='play'),
    path('dolacz/', views.join, name='join'),
    path('wyjdz/', views.quit_game, name='quit'),
]
