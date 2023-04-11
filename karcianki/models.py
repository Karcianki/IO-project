from django.db import models


class Game(models.Model):
    game_id = models.IntegerField()

    def __str__(self):
        return self.game_id

class Player(models.Model):
    player_id = models.IntegerField()
    nickname = models.CharField(max_length=10)
    game_id = models.ForeignKey(Game, on_delete=models.CASCADE)

    def __str__(self):
        return self.nickname