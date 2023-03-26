import pytest
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options


#Fixture for Chrome
@pytest.fixture(scope="class")
def chrome_driver_init(request):
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    chrome_driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
    # chrome_driver = webdriver.Chrome(ChromeDriverManager().install())
    request.cls.driver = chrome_driver
    yield
    chrome_driver.close()