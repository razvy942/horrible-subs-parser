import requests

class Jikan:
    def __init__(self):
        self.url = 'https://api.jikan.moe/v3/'
        
    def search(self, name):
        info = self.__get_info(name)
        return info

    def __get_id(self, name, limit=5):
        # by default limit answers to only 10 
        uri = self.url + f'search/anime?q={name}&limit={limit}'
        res = requests.get(uri)
        res.raise_for_status()
        # usually the first result is correct, but if not check the rest
        series = res.json()
        return series['results'][0]['mal_id']

    def __get_info(self, name):
        mal_id = self.__get_id(name)
        info_url = self.url + f'anime/{mal_id}'
        episodes_url = info_url + f'/episodes'

        series_info = requests.get(info_url).json()
        episodes_info = requests.get(episodes_url).json()['episodes']
        episodes_info = {'episodes_info': episodes_info}
        if not series_info or not episodes_info:
            raise Exception('Failed to fetch series info')
        series_info.update(episodes_info)
        return series_info

if __name__ == '__main__':
    parser = Jikan()
    results = parser.search('Naruto')
    pprint.pprint(results)