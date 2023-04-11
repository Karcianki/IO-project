from django.shortcuts import render

from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse

from karcianki.forms import PokerHostForm
from karcianki.forms import TysiacHostForm
from karcianki.forms import BrydzHostForm
from karcianki.forms import PlayerForm


def index(request):
    return render(request, 'index.html')

def pokerHost(request):
    if request.method == 'POST':
        form = PokerHostForm(request.POST)

        if form.is_valid():
            return HttpResponseRedirect(reverse('pokerHost'))
    else:
        form = PokerHostForm()
    
    context = {
        'form': form,
    }
    return render(request, 'logowanie/poker/host.html', context)

def poker(request):
    return render(request, 'poker.html')

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