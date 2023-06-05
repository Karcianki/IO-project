"""Module models provides database models."""
from random import randint
from django.db import models

class Game(models.Model):
    """Class Game provides database model for created games."""
    MIN_ID  = 100000
    MAX_ID  = 999999
    game_id = models.IntegerField(primary_key=True)
    start_chips  = models.IntegerField(default=100)
    pot = models.IntegerField(default=0)
    last_raise = models.IntegerField(null=True)
    stage = models.IntegerField(default=1)
    dealer = models.IntegerField(default=0)
    player_number = models.IntegerField(default=-1)
    status = models.CharField(max_length=5, choices=[('START', 'START'), 
                                                     ('TURN', 'TURN'), 
                                                     ('NEXT', 'NEXT'), 
                                                     ('END', 'END')], default='START') 
    last_bet = models.IntegerField(default=0)

    @classmethod
    def create(cls):
        """Function create creates new game with unique game_id."""
        new_id = randint(Game.MIN_ID, Game.MAX_ID)
        game = Game(game_id=new_id)
        return game

    def str(self):
        return str(self.game_id)

class Player(models.Model):
    """Class Player provides database model for players."""
    nickname = models.CharField(max_length=10)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    player_number = models.IntegerField(default=0)
    chips = models.IntegerField(default=100)
    last_bet = models.IntegerField(default=0)
    info = models.CharField(max_length=15, default="")

    def __str__(self):
        return str(self.nickname)

class TGame(models.Model):
    """Class Game provides database model for created games."""
    MIN_ID  = 100000
    MAX_ID  = 999999
    game_id = models.IntegerField(primary_key=True)
    status = models.CharField(max_length=5, choices=[('START', 'START'), 
                                                     ('TURN', 'TURN'),
                                                     ('END', 'END')], default='START') 
    last_bet  = models.IntegerField(default=100)
    player100 = models.IntegerField(default=0)
    playing   = models.IntegerField(default=0)
    player_number= models.IntegerField(default=0)

    @classmethod
    def create(cls):
        """Function create creates new game with unique game_id."""
        new_id = randint(TGame.MIN_ID, TGame.MAX_ID)
        game = TGame(game_id=new_id)
        return game

    def str(self):
        return str(self.game_id)

class TPlayer(models.Model):
    """Class Player provides database model for players."""
    nickname = models.CharField(max_length=10)
    game = models.ForeignKey(TGame, on_delete=models.CASCADE)
    player_number = models.IntegerField(default=0)
    points = models.IntegerField(default=0)
    info = models.CharField(max_length=15, default="")

    def __str__(self):
        return str(self.nickname)

class BGame(models.Model):
    """Class Game provides database model for created games."""
    MIN_ID  = 100000
    MAX_ID  = 999999
    game_id = models.IntegerField(primary_key=True)
    status = models.CharField(max_length=5, choices=[('START', 'START'), 
                                                     ('TURN', 'TURN'),
                                                     ('END', 'END')], default='START') 
    last_bet  = models.IntegerField(default=100)
    player100 = models.IntegerField(default=0)
    playing   = models.IntegerField(default=0)
    player_number= models.IntegerField(default=0)

    @classmethod
    def create(cls):
        """Function create creates new game with unique game_id."""
        new_id = randint(BGame.MIN_ID, BGame.MAX_ID)
        game = BGame(game_id=new_id)
        return game

    def str(self):
        return str(self.game_id)

class BPlayer(models.Model):
    """Class Player provides database model for players."""
    nickname = models.CharField(max_length=10)
    game = models.ForeignKey(BGame, on_delete=models.CASCADE)
    player_number = models.IntegerField(default=0)
    points = models.IntegerField(default=0)
    info = models.CharField(max_length=15, default="")

    def __str__(self):
        return str(self.nickname)