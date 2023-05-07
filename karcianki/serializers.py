from rest_framework import serializers
from karcianki.models import Game, Player

class GameSerializer(serializers.ModelSerializer):

    class Meta:
        model = Game
        fields = (
            'game_id',
            'start_chips',
            'pot',
            'last_raise',
            'stage',
            'dealer',
            'player_number',
            'status',
            )

class PlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Player
        fields = (
            'nickname',
            'game',
            'player_number',
            'chips',
            'last_bet',
            'info',
            )