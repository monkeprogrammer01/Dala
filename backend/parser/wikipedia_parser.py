import requests
from bs4 import BeautifulSoup as bs

base_url = "https://ru.wikipedia.org/wiki/"

def get_nation_info(nation):
    url = base_url + nation.capitalize()
    request = requests.get(url)
    result = bs(request.text, "lxml")
    print(request.status_code)
    print(result.text)

get_nation_info("Казахи")