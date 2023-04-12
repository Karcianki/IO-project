"""Django views module for ioproject."""
from django.shortcuts import render

def index(request):
    """View of home page."""
    return render(request, 'index.html')
