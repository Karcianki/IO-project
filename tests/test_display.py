from helper import get_urls
from chromeConf import chrome_driver_init
import pytest
import time
from time import sleep

@pytest.mark.usefixtures("chrome_driver_init")
class Test_Resizing():
    def test_resizing_is_smooth(self):
        for url in get_urls():
            self.driver.get(url)
            self.driver.set_window_position(0, 0)
            self.driver.set_window_size(1024, 768)
            time.sleep(2)
            for i in range(50):
                start = time.time()
                self.driver.set_window_size(1024 + 4 * i, 768 + 3 * i)
                time.sleep(max(0, start + 0.07 - time.time()))
            self.driver.set_window_size(1280, 720)
            time.sleep(2)
            for i in range(60):
                start = time.time()
                self.driver.set_window_size(1280 + 8 * i, 720 + int(4.5 * i))
                time.sleep(max(0, start + 0.07 - time.time()))

    def test_small_resolution(self):
        for url in get_urls():
            self.driver.get(url)
            self.driver.set_window_size(400, 600)
            time.sleep(2)
            self.driver.set_window_size(500, 700)
            time.sleep(2)
            self.driver.set_window_size(800, 1000)
            time.sleep(2)
            self.driver.set_window_size(1000, 800)
            time.sleep(2)