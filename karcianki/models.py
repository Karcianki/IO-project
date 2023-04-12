"""Module models provides database models."""
import math
import decimal
from random import randint

from django.db import models

from django.core.validators import MaxValueValidator, MinValueValidator, MinLengthValidator

class Game(models.Model):
    """Class Game provides database model for created games."""
    MAX_ID = 999999
    DIGITS = int(math.log10(MAX_ID)) + 1
    game_id = models.DecimalField(max_digits=DIGITS, decimal_places=0, primary_key=True,
                                  validators=[
                                      MinValueValidator(decimal.Decimal(0)),
                                      MaxValueValidator(
                                          decimal.Decimal(MAX_ID))
                                  ],)

    @classmethod
    def create(cls):
        """Function create creates new game with unique game_id."""
        new_id = randint(0, Game.MAX_ID)
        game = Game(game_id=new_id)
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

    class Meta:
        "Metadata class."
        constraints = [
            models.UniqueConstraint(
                fields=['nickname', 'game_id'], name='unique nickname in game')
        ]

    def __str__(self):
        return str(self.nickname)
