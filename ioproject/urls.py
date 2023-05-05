"""ioproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from django.urls import re_path, path, include

from . import views

from django.conf import settings
from django.conf.urls.static import static

from karcianki.views import game_data, join_game, players_data, create_game, delete_player, update_player, player_data

urlpatterns = [
    # path('', views.index, name='index'),
    path('admin/', admin.site.urls),
    path('karcianki/', include('karcianki.urls')),
    re_path(r'^api/karcianki/game/(?P<game_id>[0-9]{6})/$', game_data),
    re_path(r'^api/karcianki/players/(?P<game_id>[0-9]{6})/$', players_data),
    re_path(r'^api/karcianki/player/(?P<game_id>[0-9]{6})/(?P<nickname>[a-z]{4,10})$', player_data),
    re_path(r'^api/karcianki/create/$', create_game),
    re_path(r'^api/karcianki/join/$', join_game),
    re_path(r'^api/karcianki/quit/$', delete_player),
    re_path(r'^api/karcianki/update/$', update_player)
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

from django.views.generic import RedirectView
urlpatterns += [
    path('', RedirectView.as_view(url='karcianki/', permanent=True)),
]