from rest_framework import serializers
from karcianki.models import Game, Player

class GameSerializer(serializers.ModelSerializer):

    class Meta:
        model = Game
        fields = (
            'game_id',
            'player_count',
            'start_chips'   
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
            )