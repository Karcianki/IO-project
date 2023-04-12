from django.shortcuts import render

from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse

from karcianki.forms import PokerHostForm, TysiacHostForm, BrydzHostForm, PlayerForm

from karcianki.models import Game, Player

def redirectInGame(request):
    if 'player_id' in request.session:
        return HttpResponseRedirect(reverse('play'))
    else:
        return None

def index(request):
    redirect = redirectInGame(request)
    if redirect is not None:
        return redirect
    else:
        if 'game_type' in request.session.keys():
            del request.session['game_type']
        return render(request, 'index.html')

def host(request):
    redirect = redirectInGame(request)
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
            player = Player(nickname=nickname, game=new_game)
            player.save()
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
    redirect = redirectInGame(request)
    if redirect is not None:
        return redirect

    game_type = request.GET['game']

    if request.method == 'POST':
        form = PlayerForm(request.POST)

        if form.is_valid():
            game_id = form.cleaned_data['game_id']
            game = get_object_or_404(Game, game_id=game_id)
            nickname = form.cleaned_data['nickname']
            player = Player(nickname=nickname, game=game)
            player.save()
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
    if ('player_id' not in request.session.keys()) or \
        (not Player.objects.filter(id=request.session['player_id'])):
        return HttpResponseRedirect(reverse('quit'))

    game_type = request.session['game_type']

    player = Player.objects.get(id=request.session['player_id'])
    game_id = player.game.game_id
    context = {
        'game_id': game_id
    }
    return render(request, f'{game_type}.html', context)

def quit(request):
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
    
    if 'game_type' in request.session.keys():
        del request.session['game_type']
    
    return HttpResponseRedirect(reverse('index'))