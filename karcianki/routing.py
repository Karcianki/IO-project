###This module provides routing to the consumer###
from django.urls import path, re_path
from karcianki.consumers import KarciankiConsumer

websocket_urlpatterns = [
    path('ws/karcianki/<int:game_id>/', KarciankiConsumer.as_asgi())
]