from django.shortcuts import render

from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse

from karcianki.forms import PokerHostForm, TysiacHostForm, BrydzHostForm, PlayerForm

from karcianki.models import Game, Player

def index(request):
    return render(request, 'index.html')

def pokerHost(request):
    if request.method == 'POST':
        form = PokerHostForm(request.POST)

        if form.is_valid():
            new_game = Game.create()
            new_game.save()
            nickname = form.cleaned_data['nickname']
            player = Player(nickname=nickname, game=new_game)
            player.save()
            request.session['player_id'] = player.id

            return HttpResponseRedirect(reverse('poker'))
    else:
        form = PokerHostForm()
    
    context = {
        'form': form,
    }
        
    return render(request, 'logowanie/poker/host.html', context)

def poker(request):
    player = Player.objects.get(id=request.session['player_id'])
    game_id = player.game.game_id
    context = {
        'game_id': game_id
    }
    return render(request, 'poker.html', context)

def tysiacHost(request):
    if request.method == 'POST':
        form = TysiacHostForm(request.POST)

        if form.is_valid():
            return HttpResponseRedirect(reverse('tysiacHost'))
    else:
        form = TysiacHostForm()
    
    context = {
        'form': form,
    }
    return render(request, 'logowanie/tysiac/host.html', context)

def brydzHost(request):
    if request.method == 'POST':
        form = BrydzHostForm(request.POST)

        if form.is_valid():
             return HttpResponseRedirect(reverse('brydzHost'))
    else:
        form = BrydzHostForm()
    
    context = {
        'form': form,
    }
    return render(request, 'logowanie/brydz/host.html', context)

def pokerPlayer(request):
    if request.method == 'POST':
        form = PlayerForm(request.POST)

        if form.is_valid():
            return HttpResponseRedirect(reverse('pokerPlayer'))
    else:
        form = PlayerForm()
    
    context = {
        'form': form,
    }
    return render(request, 'logowanie/poker/login.html', context)
def tysiacPlayer(request):
    if request.method == 'POST':
        form = PlayerForm(request.POST)

        if form.is_valid():
            return HttpResponseRedirect(reverse('tysiacPlayer'))
    else:
        form = PlayerForm()
    
    context = {
        'form': form,
    }
    return render(request, 'logowanie/tysiac/login.html', context)
def brydzPlayer(request):
    if request.method == 'POST':
        form = PlayerForm(request.POST)

        if form.is_valid():
            return HttpResponseRedirect(reverse('brydzPlayer'))
    else:
        form = PlayerForm()
    
    context = {
        'form': form,
    }
    return render(request, 'logowanie/brydz/login.html', context)