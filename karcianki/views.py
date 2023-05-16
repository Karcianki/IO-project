"""Django views module for karcianki application."""
from django.shortcuts import get_object_or_404
import json

from karcianki.models import Game, Player, TGame, TPlayer

from rest_framework.response import Response
from rest_framework.decorators import api_view

from karcianki.serializers import *

@api_view(['GET'])
def game_data(request, game_id):
    try:
        game = get_object_or_404(Game, game_id=game_id)
        serializer = GameSerializer(game)
    except:
        None

    try:
        game = get_object_or_404(TGame, game_id=game_id)
        serializer = TGameSerializer(game)
    except:
        None
    
    if request.method == 'GET':
        return Response(serializer.data)

@api_view(['GET'])
def players_data(request, game_id):
    try:
        game = get_object_or_404(Game, game_id=game_id)
        players = Player.objects.filter(game=game)
        serializer = PlayerSerializer(players, many=True)
    except:
        None
    
    try:
        game = get_object_or_404(TGame, game_id=game_id)
        players = TPlayer.objects.filter(game=game)
        serializer = TPlayerSerializer(players, many=True)
    except:
        None

    if request.method == 'GET':
        return Response(serializer.data)
    
@api_view(['POST'])
def create_game(request):
    body = json.loads(request.body.decode('utf-8'))
    nickname = body['nickname']
    game_type = body['type']

    if game_type == "POKER":
        chips = body['chips']
        game = Game.create()
        game.start_chips = chips
        game.stage = 1
        game.dealer = 0
        game.save()

        player = Player(nickname=nickname, game=game, player_number=0, chips=game.start_chips)
        player.save()

        serializer = GameSerializer(game)

    elif game_type == "TYSIAC":
        game = TGame.create()
        game.save()

        player = TPlayer(nickname=nickname, game=game, player_number=0)
        player.save()
        
        serializer = TGameSerializer(game)

    if request.method == 'POST':
            return Response(serializer.data)
    
@api_view(['POST'])
def join_game(request):
    body = json.loads(request.body.decode('utf-8'))
    game_id = body['game_id']
    nickname = body['nickname']
    game_type = body['type']

    if game_type == "POKER":
        game = get_object_or_404(Game, game_id=game_id)

        players = Player.objects.filter(game=game).count()
        player = Player(nickname=nickname, game=game, player_number=players, chips=game.start_chips)
        player.save()
        serializer = PlayerSerializer(player)
    elif game_type == "TYISAC":
        game = get_object_or_404(TGame, game_id=game_id)

        players = TPlayer.objects.filter(game=game).count()
        player = TPlayer(nickname=nickname, game=game, player_number=players)
        player.save()
        serializer = TPlayerSerializer(player)

    if request.method == 'POST':
        return Response(serializer.data)
    