from django.test import LiveServerTestCase

from selenium.webdriver.common.by import By

from .conf import getDriver
from karcianki.models import Player

class Test_Redirect(LiveServerTestCase):
    def test_redirect(self):
        driver = getDriver()

        driver.get(f"{self.live_server_url}/karcianki/graj")
        driver.get(self.live_server_url)

        find = driver.find_element(By.ID, value="poker")
        button = find.find_element(By.CLASS_NAME, "create")
        button.click()

        n_players = driver.find_element(By.ID, "id_n_players")
        n_players.clear()
        n_players.send_keys(4)

        chips = driver.find_element(By.ID, "id_chips_per_player")
        chips.clear()
        chips.send_keys(100)

        nickname = driver.find_element(By.ID, "id_nickname")
        nickname.clear()
        nickname.send_keys("pjoter")

        submit = driver.find_element(By.ID, "s_button")
        submit.click()

        driver.get(self.live_server_url)
        driver.get(f"{self.live_server_url}/karcianki/stworz/?game=poker")
        driver.get(f"{self.live_server_url}/karcianki/dolacz/?game=poker")

        driver.close()