"""ioproject URL Configuration"""

from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('stworzPokera/', views.pokerHost, name='pokerHost'),
    path('poker/', views.poker, name='poker'),
    # path('brydz/', views.poker, name='poker'),
    # path('tysiac/', views.poker, name='poker'),
    path('stworzTysiaca/', views.tysiacHost, name='tysiacHost'),
    path('stworzBrydza/', views.brydzHost, name='brydzHost'),
    path('dolaczDoPokera/', views.pokerPlayer, name='pokerPlayer'),
    path('dolaczDoBrydza/', views.brydzPlayer, name='brydzPlayer'),
    path('dolaczDoTysiaca/', views.tysiacPlayer, name='tysiacPlayer'),

]
