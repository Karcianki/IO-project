from django import forms

from django.core.exceptions import ValidationError

class PokerHostForm(forms.Form):
    n_players = forms.DecimalField(min_value=2, max_value=10, 
                                   required=True, 
                                   widget=forms.NumberInput(
                                    attrs={'placeholder': 4}
                                   ),
                                   help_text="Podaj liczbę graczy (od 2 do 10)")
    chips_per_player = forms.DecimalField(min_value=10, max_value=1000000, 
                                          required=True,
                                          widget=forms.NumberInput(
                                            attrs={'placeholder': 100}
                                          ),
                                          help_text="Podaj liczbę żetonów na gracza")
    nickname = forms.CharField(min_length=4, max_length=10, 
                               required=True,
                               widget=forms.TextInput(
                                attrs={'placeholder': 'Nick gracza'}
                               ),
                               help_text="Podaj swój nick")
    
    def clean_nickname(self):
        data =  self.cleaned_data['nickname']
        if not all(c.islower() for c in data):
            raise ValidationError('Nick nie składa się z samych małych liter')
        return data