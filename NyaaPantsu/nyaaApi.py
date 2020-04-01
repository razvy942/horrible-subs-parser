import requests
import pprint
import re

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
        
    def get_available_resolutions(self, show):
        regex = re.compile('\[(.*?)\]')
        matches = re.findall(regex, show)
        resolutions = []
        for match in matches:
            if re.search(re.compile('.*[\d*][p]$'), match):
                resolutions.append(match)
        return resolutions

    def __get_torrent_info(self, id):
        pass

    def __construct_search_string(self, name, episode_number):
        return f'[HorribleSubs] {name} - {episode_number}'


if __name__ == '__main__':
    nyaa = NyaaPantsu()
    gen = nyaa.search_torrent('monster musume', '1')
    shows = next(gen)
    # pprint.pprint(shows['torrents'])
    for show in shows['torrents']:
        resolutions = nyaa.get_available_resolutions(show['name'])
        print(resolutions)
        print(show['name'])
        
    # print(shows['torrents'][0]['seeders'] > 0)
    # shows = next(gen)
    # pprint.pprint(shows['torrents'][0]['name'])
    # shows = next(gen)
    # pprint.pprint(shows['torrents'][0]['name'])