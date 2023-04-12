# Django
from django.test import LiveServerTestCase

# Selenium
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

from .conf import getDriver

# Create your tests here.
class Test_Nav(LiveServerTestCase):
  def test_nav_from_main(self):
        driver = getDriver()
        driver.get('http://127.0.0.1:8000/')

        games = ["poker", "brydz", "tysiac"]
        types = ["login", "create"]
        for game in games:
            for typelog in types:
                find = driver.find_element(by=By.ID, value=game)
                button = find.find_element(by=By.CLASS_NAME, value=typelog)
                button.click()
                driver.back()
        driver.close()
