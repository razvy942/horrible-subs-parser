import requests

# https://nyaa.net/apidoc/   Nyaa official api

class NyaaPantsu:
    def __init__(self):
        self.base_url = 'https://nyaa.pantsu.cat/api/'

    def search_torrent(self, name):
        url = f'{self.base_url}/search/q={name}'
        res = requests.get(url)
        res.raise_for_status()  # in case response is 4xx or 5xx


    def __get_torrent_info(self, id):
        pass
