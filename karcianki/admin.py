"""Django admin module."""
from django.contrib import admin

from .models import Game, Player, TGame, TPlayer, BGame, BPlayer

admin.site.register(Game)
admin.site.register(Player)
admin.site.register(TGame)
admin.site.register(TPlayer)
admin.site.register(BGame)
admin.site.register(BPlayer)

