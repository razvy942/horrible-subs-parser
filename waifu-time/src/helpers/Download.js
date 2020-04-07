import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ipcRenderer } from 'electron';

const Download = ({ magnetURI }) => {
  const [videoPath, setVideoPath] = useState('./');

  useEffect(() => {
    ipcRenderer.on('add-torrent-reply', (event, arg) => {
      console.log(arg);
      ipcRenderer.removeListener('add-torrent-reply', (listener) => {
        //
      });
    });

    ipcRenderer.on('get-torrent-info-reply', (event, arg) => {
      console.log(arg);
      const keys = Object.keys(arg);
      setVideoPath(
        arg[keys[keys.length - 1]].path + '/' + arg[keys[keys.length - 1]].name
      );
      console.log(
        arg[keys[keys.length - 1]].path + arg[keys[keys.length - 1]].name
      );
    });

    // Removing listeners when component unmounts
    return () => ipcRenderer.removeAllListeners();
  }, []);

  const addTorrent = () => {
    let testMagnet =
      'magnet:?xt=urn:btih:CB7ESHB2WPDBLA4J2T2K4EBZKT5TAZWA&tr=http://nyaa.tracker.wf:7777/announce&tr=udp://tracker.coppersurfer.tk:6969/announce&tr=udp://tracker.internetwarriors.net:1337/announce&tr=udp://tracker.leechersparadise.org:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://open.stealth.si:80/announce&tr=udp://p4p.arenabg.com:1337/announce&tr=udp://mgtracker.org:6969/announce&tr=udp://tracker.tiny-vps.com:6969/announce&tr=udp://peerfect.org:6969/announce&tr=http://share.camoe.cn:8080/announce&tr=http://t.nyaatracker.com:80/announce&tr=https://open.kickasstracker.com:443/announce';

    if (magnetURI) testMagnet = magnetURI;
    ipcRenderer.send('add-torrent', testMagnet);
  };

  const getTorrentInfo = () => {
    ipcRenderer.send('get-torrent-info', 'give me info');
  };

  return (
    <div>
      <h1>Latest Releases</h1>
      <button onClick={addTorrent}>ADD NEW TORRENT</button>
      <Link
        to={{
          pathname: '/player',
          state: {
            path: videoPath,
          },
        }}
      >
        watch video
      </Link>

      <button onClick={getTorrentInfo}>get info</button>
    </div>
  );
};

export default Download;
