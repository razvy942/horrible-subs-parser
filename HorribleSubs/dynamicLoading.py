from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.common.keys import Keys
import time

options = Options()
options.headless = True
browser = webdriver.Firefox(options=options)

# select class 'hs-shows'
# this contains divs with class 'rls-info-container' and id's corresponding to episode numbers
def get_latest_episodes(episode_provided=False):
    if not episode_provided:
        browser.get('https://horriblesubs.info/shows/shingeki-no-kyojin/')
    
    episdes_container = browser.find_element_by_class_name('hs-shows')
    episodes = episdes_container.find_elements_by_class_name('rls-info-container')

    for episode in episodes:
        while True:
            try:
                episode_links_container = episode.find_element_by_class_name('rls-links-container')
                current_ep = episode_links_container.find_element_by_tag_name('div')
                torrent = (current_ep.find_element_by_class_name('hs-magnet-link')).find_element_by_tag_name('a')
                link = torrent.get_attribute('href')

                print(link)
                # If only searching for 1 episode, break out of loop
                if episode_provided:
                    browser.quit()
                    return
                break
            except (WebDriverException) as ex:
                print(f'Episodes not available {ex}')
                time.sleep(0.2)

    browser.quit()

def get_episode(episode_number='35'):
    browser.get('https://horriblesubs.info/shows/shingeki-no-kyojin/')
    input_box = browser.find_element_by_class_name('search-bar')
    input_box.send_keys(episode_number)
    input_box.send_keys(Keys.RETURN)
    time.sleep(0.5)
    get_latest_episodes(True)

if __name__ == '__main__':
    get_latest_episodes()                                                       
    # get_episode()



    