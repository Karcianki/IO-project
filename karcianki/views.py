from django.shortcuts import render

from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse

from karcianki.forms import PokerHostForm
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