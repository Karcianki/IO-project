# pip install selenium 
# pobranie chromedrivera https://chromedriver.chromium.org/


from selenium import webdriver
from time import sleep

browser = webdriver.Chrome()
browser.get("file:///Users/maciek/Desktop/IO/IO-project/logowanie/poker/login.html")


sleep(100)