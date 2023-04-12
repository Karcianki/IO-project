from django.test import LiveServerTestCase

from selenium.webdriver.common.by import By

from .conf import getDriver
from karcianki.models import Player, Game

class Test_Create_Game(LiveServerTestCase):
    def test_create_game(self):
        driver = getDriver()
        driver.get(self.live_server_url)

        Game.objects.create(game_id=123456)

        games = ["poker", "brydz", "tysiac"]
        for game in games:
            find = driver.find_element(By.ID, value=game)
            button = find.find_element(By.CLASS_NAME, "login")
            button.click()

            submit = driver.find_element(By.ID, "s_button")

            gameId = driver.find_element(By.ID, "id_game_id")
            for i in [99999, 1000000, 654321, 123456]:
                gameId.clear()
                gameId.send_keys(i)
                submit.click()

            nickname = driver.find_element(By.ID, "id_nickname")

            for i in ["pjo", "PjO", "pjoter"]:
                nickname.clear()
                nickname.send_keys(i)
                submit.click()

            assert Player.objects.filter(nickname="pjoter").exists()
            driver.get(f"{self.live_server_url}/karcianki/wyjdz")

        driver.close()