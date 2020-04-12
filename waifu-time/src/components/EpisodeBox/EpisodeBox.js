import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import axios from 'axios';
import pic from '../UI/images/not-found-banner.png';

import FullscreenLoad from '../UI/Loading/FullscreenLoad';
import classes from './EpisodeBox.module.css';

const EpisodeBox = ({ background, epNumber, match }) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [magnetURI, setMagnetURI] = useState(null);
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    console.log(background);
    ipcRenderer.on('add-torrent-reply', (event, arg) => {
      ipcRenderer.send('get-torrent-info', 'give me info');
    });

    ipcRenderer.on('get-torrent-info-reply', (event, arg) => {
      const keys = Object.keys(arg);
      const videoPath =
        arg[keys[keys.length - 1]].path + '/' + arg[keys[keys.length - 1]].name;

      history.push('/player', { path: videoPath });
    });

    return () => ipcRenderer.removeAllListeners();
  }, []);

  const addTorrent = (magnetURI) => {
    let testMagnet =
      'magnet:?xt=urn:btih:CB7ESHB2WPDBLA4J2T2K4EBZKT5TAZWA&tr=http://nyaa.tracker.wf:7777/announce&tr=udp://tracker.coppersurfer.tk:6969/announce&tr=udp://tracker.internetwarriors.net:1337/announce&tr=udp://tracker.leechersparadise.org:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://open.stealth.si:80/announce&tr=udp://p4p.arenabg.com:1337/announce&tr=udp://mgtracker.org:6969/announce&tr=udp://tracker.tiny-vps.com:6969/announce&tr=udp://peerfect.org:6969/announce&tr=http://share.camoe.cn:8080/announce&tr=http://t.nyaatracker.com:80/announce&tr=https://open.kickasstracker.com:443/announce';

    if (magnetURI) testMagnet = magnetURI['720p'];
    ipcRenderer.send('add-torrent', testMagnet);
  };

  const goToVideoPlayer = (resolution) => {
    addTorrent(resolution);
    // history.push('/player', {path: });
  };

  const getEpisodeMagnet = (epNumber) => {
    const title = match.params.title;

    axios
      .get(
        `http://127.0.0.1:5000/horriblesubs/get-episode/${title}/${epNumber}`
      )
      .then((res) => {
        const uri = res.data;
        let resolution = {};
        uri.forEach((show) => {
          Object.keys(show).forEach((key) => {
            resolution['720p'] = show[key]['720p'];
            resolution['1080p'] = show[key]['1080p'];
          });
        });

        goToVideoPlayer(resolution);
        console.log(resolution);
      })
      .catch((err) => {
        console.log(`Error fetching ${title}'s details: ${err}`);
        setError(true);
      });
  };

  const clickHandler = () => {
    if (!isLoading) getEpisodeMagnet(epNumber);
    setIsLoading(!isLoading);
  };

  return (
    <div onClick={clickHandler} className={classes.container}>
      {isLoading ? (
        <FullscreenLoad
          message="Fetching torrent link, please wait..."
          handleHide={() => setIsLoading(false)}
        />
      ) : null}
      <img
        className={classes.image}
        src={background ? background : pic}
        alt="Banner for show"
      />
      <p className={classes.episodeNumber}>Episode {epNumber}</p>
    </div>
  );
};

export default withRouter(EpisodeBox);
