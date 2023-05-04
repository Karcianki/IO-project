"""
ASGI config for ioproject project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os

import django
from django.core.asgi import get_asgi_application
from channels.http import AsgiHandler
from channels.routing import ProtocolTypeRouter
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import karcianki.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ioproject.settings')

django.setup()

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            karcianki.routing.websocket_urlpatterns
        )
    ),
})
