from helper import get_urls
from chromeConf import chrome_driver_init
import pytest
import time
from time import sleep
from selenium.webdriver.common.by import By

@pytest.mark.usefixtures("chrome_driver_init")
class Test_Nav():
    def test_nav_from_main(self):
        for url in get_urls('main'):
            self.driver.get(url)
            games = ["poker", "brydz", "tysiac"]
            types = ["login", "create"]
            for game in games:
                for typelog in types:
                    find = self.driver.find_element(by=By.ID, value=game)
                    button = find.find_element(by=By.ID, value=typelog)
                    button.click()
                    self.driver.back()
            