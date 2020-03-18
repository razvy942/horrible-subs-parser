from bs4 import BeautifulSoup
import requests
from enum import Enum
import pprint

from HorribleSubs import dynamicLoading

TORRENT_SITE = 'https://xdcc.horriblesubs.info/?search='
SHOW_TITLE = '[HorribleSubs] One Piece - 913 [1080p]'

LATEST_RELEASES = 'https://horriblesubs.info/api.php?method=getlatest'
MORE_LATEST = '&nextid='        # range from 0-2  


class HorribleSubsURL(Enum):
    LATEST = 'https://horriblesubs.info/api.php?method=getlatest'
    LATEST_SHOW_MORE = 'https://horriblesubs.info/api.php?method=getlatest&nextid='
    IRC_SITE = 'https://xdcc.horriblesubs.info/?search=[HorribleSubs] Rikei ga Koi ni Ochita no de Shoumei shitemita [1080p]' #gets all episodes

class HorribleSubsParser:
    def __init__(self):
        self.current_page = 0
        self.recent_releases = {}
        self.current_season = []
        self.current_show = None
 
    def construct_show_name(self, show_name, episode_number):
        resolutions = {
            '480p': f'[HorribleSubs] {show_name} - {episode_number} [480p]', 
            '720p': f'[HorribleSubs] {show_name} - {episode_number} [720p]', 
            '1080p': f'[HorribleSubs] {show_name} - {episode_number} [1080p]', 
        }
        return resolutions

    def search_torrent_url(self, show_name, episode_number):
        horrible_show_name = self.construct_show_name(show_name, episode_number)
        self.current_show = f'https://xdcc.horriblesubs.info/?search={horrible_show_name["1080p"]}'
        # return f'https://xdcc.horriblesubs.info/?search={horrible_show_name["1080p"]}'

    def get_episodes(self):
        # use functions from dynamic loading
        pass 

    def get_current_season_releases(self):
        html_doc = requests.get('https://horriblesubs.info/current-season/')
        soup = BeautifulSoup(html_doc.content, features='lxml')
        shows =  soup.findAll("div", {"class": "ind-show"})
        for show in shows:
            self.current_season.append( (show.get_text(), show.select('a')[0]['href']) )
        
    def get_latest(self):
        yield self.__parse_latest_list('https://horriblesubs.info/api.php?method=getlatest')
        current_page = 0
        # TODO: change magic number into try catch while response is good
        while current_page < 3:
            yield self.__parse_latest_list(f'https://horriblesubs.info/api.php?method=getlatest&nextid={current_page}')
            current_page += 1

    def __parse_latest_list(self, url):
        html_doc = requests.get(url)
        soup = BeautifulSoup(html_doc.content, features='lxml')
        
        for links in soup.select('ul > li'):
            date = links.select('span')[0].get_text()
            show_name = links.select('a')[0].get_text()
            if date not in self.recent_releases:
                self.recent_releases[date] = []
                self.recent_releases[date].append(show_name[len(date):])
            else:
                self.recent_releases[date].append(show_name[len(date):])
        
        
    # def __str__(self):
    #     return self.recent_releases

if __name__ == '__main__':
    horrible_parser = HorribleSubsParser()
    latest_releases_gen = horrible_parser.get_latest()
    # Getting latest
    next(latest_releases_gen)
    pprint.pprint(horrible_parser.recent_releases)

    user_choice = input('Show more ? y n\n')
    while user_choice == 'y':
        try:
            next(latest_releases_gen)
            pprint.pprint(horrible_parser.recent_releases)
            user_choice = input('Show more ? y n\n')
        except:
            print('That\'s all')
            break

    horrible_parser.get_current_season_releases()
    pprint.pprint(horrible_parser.current_season)
        