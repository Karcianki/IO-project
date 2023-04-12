from django import forms

from django.core.exceptions import ValidationError

from karcianki.models import Game, Player

class AForm(forms.Form):
    nickname = forms.CharField(min_length=4, max_length=10, 
                               required=True,
                               widget=forms.TextInput(
                                attrs={'placeholder': 'Nick gracza'}
                               ),
                               label="Podaj swój nick",
                               help_text="Twój nick powinien zawierać tylko małe litery i mieć długość od 4 do 10 znaków",)
    
    def clean_nickname(self):
        data =  self.cleaned_data['nickname']
        if not all(c.islower() for c in data):
            raise ValidationError('Nick nie składa się z samych małych liter')
        return data

class PokerHostForm(AForm):
    n_players = forms.DecimalField(min_value=2, max_value=10, 
                                   required=True, 
                                   widget=forms.NumberInput(
                                    attrs={'placeholder': 4}
                                   ),
                                   label="Podaj liczbę graczy (od 2 do 10)")
    chips_per_player = forms.DecimalField(min_value=10, max_value=1000000, 
                                          required=True,
                                          widget=forms.NumberInput(
                                            attrs={'placeholder': 100}
                                          ),
                                          label="Podaj liczbę żetonów na gracza")
    
    field_order = ['n_players', 'chips_per_player', 'nickname']
    
class TysiacHostForm(AForm):
    n_players = forms.DecimalField(min_value=2, max_value=4, 
                                   required=True, 
                                   widget=forms.NumberInput(
                                    attrs={'placeholder': 2}
                                   ),
                                   label="Podaj liczbę graczy (od 2 do 4)",)
    
    field_order = ['n_players', 'nickname']
    
class BrydzHostForm(AForm):
    pass

class PlayerForm(AForm):
    game_id = forms.DecimalField(min_value=0, max_value=Game.MAX_ID, 
                                   required=True, 
                                   widget=forms.NumberInput(
                                    attrs={'placeholder': 123456}
                                   ),
                                   label="Podaj numer gry")
    
    def clean_game_id(self):
        data = self.cleaned_data['game_id']
        if not Game.objects.filter(game_id=data):
            raise ValidationError('Podana gra nie istnieje')
        return data
    
    def clean(self):
        data = super().clean()

        game_id = data.get('game_id')
        nickname = data.get('nickname')

        if game_id and nickname and \
            Game.objects.filter(game_id=game_id).exists():

            game = Game.objects.get(game_id=game_id)
            if Player.objects.filter(game=game, nickname=nickname).exists():
                raise ValidationError('Gracz o tej nazwie już dołączył do gry')

        return data

    
    field_order = ['game_id', 'nickname']