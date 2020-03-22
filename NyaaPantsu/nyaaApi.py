import requests
import pprint

# https://nyaa.net/apidoc/   Nyaa official api

class NyaaPantsu:
    def __init__(self):
        self.base_url = 'https://nyaa.pantsu.cat/api/'

    def search_torrent(self, name, episode_number):
        page = 1
        show = self.__construct_search_string(name, episode_number)
        url = f'{self.base_url}search?q={show}&page='
        res = requests.get(url + str(page))
        res.raise_for_status()  # in case response is 4xx or 5xx
        while len(res.json()['torrents']):
            yield res.json()
            page += 1 
            res = requests.get(url + str(page))
            print(page)
        

    def __get_torrent_info(self, id):
        pass

    def __construct_search_string(self, name, episode_number):
        return f'[HorribleSubs] {name} - {episode_number}'


if __name__ == '__main__':
    nyaa = NyaaPantsu()
    gen = nyaa.search_torrent('Shingeki no Kyojin S2', '37')
    shows = next(gen)
    pprint.pprint(shows['torrents'][0]['name'])
    shows = next(gen)
    pprint.pprint(shows['torrents'][0]['name'])
    shows = next(gen)
    pprint.pprint(shows['torrents'][0]['name'])