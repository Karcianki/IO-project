from django.test import LiveServerTestCase

from selenium.webdriver.common.by import By

from .conf import getDriver
from karcianki.models import Player

class Test_Join_Game(LiveServerTestCase):
    def test_join_game(self):
        driver = getDriver()
        driver.get(self.live_server_url)

        games = ["poker", "brydz", "tysiac"]
        for game in games:
            find = driver.find_element(By.ID, value=game)
            button = find.find_element(By.CLASS_NAME, "create")
            button.click()

            submit = driver.find_element(By.ID, "s_button")

            if (game != "brydz"):
                n_players = driver.find_element(By.ID, "id_n_players")
                for i in [1, 11, 3]:
                    n_players.clear()
                    n_players.send_keys(i)
                    submit.click()

            if (game == "poker"):
                chips = driver.find_element(By.ID, "id_chips_per_player")
                for i in [9, 1000000002, 11]:
                    chips.clear()
                    chips.send_keys(i)
                    submit.click()

            nickname = driver.find_element(By.ID, "id_nickname")

            for i in ["pjo", "PjO", "pjoter"]:
                nickname.clear()
                nickname.send_keys(i)
                submit.click()

            assert Player.objects.filter(nickname="pjoter").exists()
            driver.get(f"{self.live_server_url}/karcianki/wyjdz")

        driver.close()