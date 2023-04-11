from django.shortcuts import render

from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse

from karcianki.forms import PokerHostForm, TysiacHostForm, BrydzHostForm, PlayerForm

from karcianki.models import Game, Player

def index(request):
    return render(request, 'index.html')

def host(request):
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
            player = Player(nickname=nickname, game=new_game)
            player.save()
            request.session['player_id'] = player.id
            request.session['game_type'] = game_type

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

def play(request):
    game_type = request.session['game_type']
    player = Player.objects.get(id=request.session['player_id'])
    game_id = player.game.game_id
    context = {
        'game_id': game_id
    }
    return render(request, f'{game_type}.html', context)

def join(request):
    game_type = request.GET['game']
    if request.method == 'POST':
        form = PlayerForm(request.POST)

        if form.is_valid():
            return HttpResponseRedirect(reverse('join'))
    else:
        form = PlayerForm()
    
    context = {
        'form': form,
    }
    return render(request, f'logowanie/{game_type}/login.html', context)