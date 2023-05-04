###This module provides routing to the consumer###
from django.urls import path, re_path
from karcianki.consumers import KarciankiConsumer

websocket_urlpatterns = [
    # url(r'^ws/karcianki/(?P<room_code>\w+)/$', KarciankiConsumer.as_asgi()),
    # re_path(r'^ws/karcianki/graj/(?P<game_id>\[0-9]{6})/$', KarciankiConsumer.as_asgi()),
    # path('ws/karcianki/test/', KarciankiConsumer.as_asgi())
    path('ws/karcianki/<int:game_id>/', KarciankiConsumer.as_asgi()),
]