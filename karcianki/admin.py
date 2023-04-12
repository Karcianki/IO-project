from django.contrib import admin

from .models import Game
from .models import Player

admin.site.register(Game)
admin.site.register(Player)