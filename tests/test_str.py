from django.test import LiveServerTestCase

from karcianki.models import Player, Game


class Test_Str(LiveServerTestCase):
    def test_str(self):
        game = Game.objects.create(game_id=123456)
        player = Player.objects.create(nickname = "pjoter", game_id=123456)
        assert (str(game) == "123456")
        assert (str(player) == "pjoter")