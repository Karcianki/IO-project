"""Module models provides database models."""
from random import randint
from django.db import models

class Game(models.Model):
    """Class Game provides database model for created games."""
    MIN_ID  = 100000
    MAX_ID  = 999999
    game_id = models.IntegerField(primary_key=True)
    start_chips  = models.IntegerField(default=100)

    @classmethod
    def create(cls, chips):
        """Function create creates new game with unique game_id."""
        new_id = randint(Game.MIN_ID, Game.MAX_ID)
        game = Game(game_id=new_id)
        game.start_chips = chips
        return game

    def __str__(self):
        return str(self.game_id)


class Player(models.Model):
    """Class Player provides database model for players."""
    nickname = models.CharField(max_length=10)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    player_number = models.IntegerField(default=0)
    chips = models.IntegerField(default=100)
    last_bet = models.CharField(max_length=20, default='')

    class Meta:
        "Metadata class."
        constraints = [
            models.UniqueConstraint(
                fields=['nickname', 'game_id'], name='unique nickname in game'),
            models.UniqueConstraint(
                fields=['player_number', 'game_id'], name='unique player number in game'),
        ]

    def __str__(self):
        return str(self.nickname)
