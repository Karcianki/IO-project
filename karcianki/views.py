"""Django views module for karcianki application."""
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse
import json

from karcianki.models import Game, Player

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from karcianki.serializers import *

@api_view(['GET'])
def game_data(request, game_id):
    game = get_object_or_404(Game, game_id=game_id)

    if request.method == 'GET':
        serializer = GameSerializer(game)
        return Response(serializer.data)

@api_view(['GET'])
def players_data(request, game_id):
    game = get_object_or_404(Game, game_id=game_id)

    if request.method == 'GET':
        players = Player.objects.filter(game=game)
        serializer = PlayerSerializer(players, many=True)
        return Response(serializer.data)
    
@api_view(['GET'])
def player_data(request, game_id, player_id):
    game = get_object_or_404(Game, game_id=game_id)
    player = get_object_or_404(Player, game=game, player_number=player_id)

    if request.method == 'GET':
        serializer = PlayerSerializer(player)
        return Response(serializer.data)
    
    
@api_view(['POST'])
def create_game(request):
    body = json.loads(request.body.decode('utf-8'))
    nickname = body['nickname']
    chips = body['chips']

    game = Game.create(chips=chips)
    game.save()

    player = Player(nickname=nickname, game=game, player_number=0, chips=game.start_chips)
    player.save()

    if request.method == 'POST':
        serializer = GameSerializer(game)
        return Response(serializer.data)
    
@api_view(['POST'])
def join_game(request):
    body = json.loads(request.body.decode('utf-8'))
    game_id = body['game_id']
    nickname = body['nickname']

    game = get_object_or_404(Game, game_id=game_id)
    game.save()

    players = Player.objects.filter(game=game).count()
    player = Player(nickname=nickname, game=game, player_number=players, chips=game.start_chips)
    player.save()

    if request.method == 'POST':
        return Response(PlayerSerializer(player).data)
    
@api_view(['POST'])
def delete_player(request):
    body = json.loads(request.body.decode('utf-8'))
    game_id = body['game_id']
    player_number = body['player_number']

    game = get_object_or_404(Game, game_id=game_id)
    player = get_object_or_404(Player, game=game, player_number=player_number)
    player.delete()

    if request.method == 'POST':
        return Response()
    
@api_view(['POST'])
def update_player(request):
    body = json.loads(request.body.decode('utf-8'))
    game_id  = body['game_id']
    nickname = body['nickname']
    chips    = body['chips']

    game = get_object_or_404(Game, game_id=game_id)
    player = get_object_or_404(Player, game=game, nickname=nickname)
    player.chips = chips
    player.save()

    if request.method == 'POST':
        return Response()

@api_view(['POST'])
def handle_turn(request, game_id, player_id):
    body = json.loads(request.body.decode('utf-8'))
    player_number = player_id
    event         = body['event']
    # chips    = body['chips']
    # last_bid = body['last_bid']
    game = get_object_or_404(Game, game_id=game_id)
    player = get_object_or_404(Player, game=game, player_number=player_number)

    if (event == 'pass'):
        player.last_bet = 'PASS'
        player.save()
    elif (event == 'check'):
        player.last_bet = 'CHECK'
        player.save()

    if request.method == 'POST':
        return Response()
