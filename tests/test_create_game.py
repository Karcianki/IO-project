# from chromeConf import chrome_driver_init
# import pytest
# import time
# from time import sleep
# from selenium.webdriver.common.by import By

# @pytest.mark.usefixtures("chrome_driver_init")
# class Test_Nav():
#     def test_nav_from_main(self):
#         self.driver.get("http://127.0.0.1:8000/")
#         games = ["poker", "brydz", "tysiac"]
#         types = ["login", "create"]
#         for game in games:
#             for typelog in types:
#                 find = self.driver.find_element(by=By.ID, value=game)
#                 button = find.find_element(by=By.CLASS_NAME, value=typelog)
#                 button.click()
#                 self.driver.back()
            