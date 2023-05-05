"""Django views module for karcianki application."""
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse
import json

from karcianki.forms import PokerHostForm, TysiacHostForm, BrydzHostForm, PlayerForm

from karcianki.models import Game, Player

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from karcianki.serializers import *

def redirect_in_game(request):
    """Function redirects to joined game if saved in session."""
    if 'player_id' in request.session:
        return HttpResponseRedirect(reverse('play'))
    return None

def index(request):
    """Main page of application."""
    redirect = redirect_in_game(request)
    if redirect is not None:
        return redirect
    return render(request, 'index.html')

def host(request):
    """Host a new game."""
    redirect = redirect_in_game(request)
    if redirect is not None:
        return redirect

    game_type = request.GET['game']

    if request.method == 'POST':
        forms = {
            'poker': PokerHostForm(request.POST),
            'brydz': BrydzHostForm(request.POST),
            'tysiac': TysiacHostForm(request.POST),
        }
        form = forms[game_type]
        if form.is_valid():
            new_game = Game.create()
            new_game.save()
            nickname = form.cleaned_data['nickname']
            player = Player(nickname=nickname, game=new_game, player_number=0)
            player.save()
            request.session['game_id'] = new_game.game_id
            request.session['player_id'] = player.id
            request.session['game_type'] = game_type
            request.session['is_host'] = True

            return HttpResponseRedirect(reverse('play'))
    else:
        forms = {
            'poker': PokerHostForm(),
            'brydz': BrydzHostForm(),
            'tysiac': TysiacHostForm(),
        }
        form = forms[game_type]


    context = {
        'form': form,
    }

    return render(request, f'logowanie/{game_type}/host.html', context)

def join(request):
    """Join a game."""
    redirect = redirect_in_game(request)
    if redirect is not None:
        return redirect

    game_type = request.GET['game']

    if request.method == 'POST':
        form = PlayerForm(request.POST)

        if form.is_valid():
            game_id = form.cleaned_data['game_id']
            game = get_object_or_404(Game, game_id=game_id)
            nickname = form.cleaned_data['nickname']
            player_number = 0
            while Player.objects.filter(game=game, player_number=player_number).exists():
                player_number += 1
            player = Player(nickname=nickname, game=game, player_number=player_number)
            player.save()
            request.session['game_id'] = game_id
            request.session['player_id'] = player.id
            request.session['game_type'] = game_type

            return HttpResponseRedirect(reverse('play'))
    else:
        form = PlayerForm()

    context = {
        'form': form,
    }
    return render(request, f'logowanie/{game_type}/login.html', context)

def play(request):
    """Game view."""
    if ('player_id' not in request.session.keys()) or \
        (not Player.objects.filter(id=request.session['player_id'])):
        return HttpResponseRedirect(reverse('quit'))

    game_type = request.session['game_type']

    player = Player.objects.get(id=request.session['player_id'])
    game_id = player.game.game_id

    game = Game.objects.get(game_id=game_id)

    players = Player.objects.filter(game = game).order_by('player_number')

    nicknames = players.values_list('nickname', flat=True)

    chips = []

    context = {
        'game_id': game_id,
        'nicknames': nicknames,
        'chips_per_player': chips,
    }
    return render(request, f'{game_type}.html', context)

def quit_game(request):
    """Quit game and clear session."""
    player = None

    if 'player_id' in request.session.keys():
        player_id = request.session['player_id']
        del request.session['player_id']
        if Player.objects.filter(id=player_id).exists():
            player = Player.objects.get(id=player_id)

    if 'is_host' in request.session.keys():
        if player is not None:
            game = player.game
            game.delete()
        del request.session['is_host']

    if player is not None:
        player.delete()

    if 'game_type' in request.session.keys():
        del request.session['game_type']

    return HttpResponseRedirect(reverse('index'))


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
def player_data(request, game_id, nickname):
    game = get_object_or_404(Game, game_id=game_id)
    player = get_object_or_404(Player, game=game, nickname=nickname)

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
    game.player_count = game.player_count + 1
    game.save()

    players = Player.objects.filter(game=game).count()
    player = Player(nickname=nickname, game=game, player_number=players, chips=game.start_chips)
    player.save()

    if request.method == 'POST':
        return Response()
    
@api_view(['POST'])
def delete_player(request):
    body = json.loads(request.body.decode('utf-8'))
    game_id = body['game_id']
    nickname = body['nickname']

    game = get_object_or_404(Game, game_id=game_id)
    player = get_object_or_404(Player, game=game, nickname=nickname)
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
