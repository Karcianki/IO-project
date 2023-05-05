"""Module models provides database models."""
import math
import decimal
from random import randint

from django.db import models

from django.core.validators import MaxValueValidator, MinValueValidator, MinLengthValidator

class Game(models.Model):
    """Class Game provides database model for created games."""
    MIN_ID  = 100000
    MAX_ID  = 999999
    DIGITS  = int(math.log10(MAX_ID)) + 1
    game_id = models.IntegerField(primary_key=True,
                                  validators=[
                                      MinValueValidator(MIN_ID),
                                      MaxValueValidator(MAX_ID)
                                  ],)
    start_chips  = models.IntegerField(default=100)
    player_count = models.IntegerField(default=1)

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
    nickname = models.CharField(max_length=10,
                                validators=[
                                    MinLengthValidator(4),
                                ])
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    player_number = models.IntegerField(default=0)
    chips = models.IntegerField(default=100)

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
