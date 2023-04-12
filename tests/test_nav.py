from django.test import LiveServerTestCase

from selenium.webdriver.common.by import By

from .conf import getDriver

class Test_Nav(LiveServerTestCase):
    def test_nav_from_main(self):
        driver = getDriver()
        driver.get(self.live_server_url)

        games = ["poker", "brydz", "tysiac"]
        types = ["login", "create"]
        for game in games:
            for typelog in types:
                find = driver.find_element(by=By.ID, value=game)
                button = find.find_element(by=By.CLASS_NAME, value=typelog)
                button.click()
                driver.back()
        driver.close()