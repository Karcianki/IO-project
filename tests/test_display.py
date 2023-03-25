from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.common.by import By
from helper import get_urls
import time

def test_resizing_is_smooth(driver: WebDriver):
    for url in get_urls():
        driver.get(url)
        driver.set_window_position(0, 0)
        driver.set_window_size(1024, 768)
        time.sleep(2)
        for i in range(50):
            start = time.time()
            driver.set_window_size(1024 + 4 * i, 768 + 3 * i)
            time.sleep(max(0, start + 0.07 - time.time()))
        driver.set_window_size(1280, 720)
        time.sleep(2)
        for i in range(60):
            start = time.time()
            driver.set_window_size(1280 + 8 * i, 720 + int(4.5 * i))
            time.sleep(max(0, start + 0.07 - time.time()))


def test_small_resolution(driver: WebDriver):
    for url in get_urls():
        driver.get(url)
        driver.set_window_size(400, 600)
        time.sleep(2)
        driver.set_window_size(500, 700)
        time.sleep(2)
        driver.set_window_size(800, 1000)
        time.sleep(2)
        driver.set_window_size(1000, 800)
        time.sleep(2)