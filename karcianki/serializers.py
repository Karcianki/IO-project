from rest_framework import serializers
from karcianki.models import Game, Player, TGame, TPlayer, BGame, BPlayer

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
            'last_bet',
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
        
class TGameSerializer(serializers.ModelSerializer):

    class Meta:
        model = TGame
        fields = (
            'game_id',
            'status',
            'last_bet',
            'player100',
            'playing',
            'player_number',
            )

class TPlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = TPlayer
        fields = (
            'nickname',
            'game',
            'player_number',
            'points',
            'info',
            )

class BGameSerializer(serializers.ModelSerializer):

    class Meta:
        model = BGame
        fields = (
            'game_id',
            'status',
            'last_bet',
            'player100',
            'playing',
            'player_number',
            )

class BPlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = BPlayer
        fields = (
            'nickname',
            'game',
            'player_number',
            'points',
            'info',
            )