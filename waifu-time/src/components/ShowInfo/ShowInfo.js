import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import axios from 'axios';

import Hr from '../UI/HorizontalLine/HorizontalLine';
import Synopsis from '../UI/Synopsis/Synopsis';
import Stats from '../UI/StatsDisplay/Stats';
import CharactersDisplay from '../UI/CharactersDisplay/Characters';
import EpisodesListing from '../EpisodesListing/EpisodesListing';
import Loading from '../UI/Loading/FullscreenLoad';
import anilist from '../../helpers/aniListApiWrapper';
import classes from './ShowInfo.module.css';

const ShowInfo = (props) => {
  /* 
    image_url,
    mal_id,
    episodes: amount of episodes,
    score,
    scores: {1: {percentage: int, votes: int}, ...},
    synopsis, 
    title,
    trailer_url,
    airing: bool,
    aired: {string: str with air date info},
    genres: [{name}, ...],
    characters: [{image_url, name, voice_actors: [{ name }]}, ...]
  */
  const [showInfo, setShowInfo] = useState(null);
  const [error, setError] = useState(false);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [apiShowInfo, setApiShowInfo] = useState(null);
  const [magnetURI, setMagnetURI] = useState([]);

  const getEpisodesInfo = (showTitle, setApiShowInfo) => {
    //const showTitle = Object.keys(showInfo)[0].split('Description')[0].trim();
    anilist.getInfo(showTitle, setApiShowInfo);
  };

  useEffect(() => {
    const title = props.match.params.title;
    // getEpisodesInfo(title, setApiShowInfo);
    axios
      .get(`http://127.0.0.1:5000/horriblesubs/get-show/${title}`)
      .then((res) => {
        setShowInfo(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(`Error fetching ${title}'s details: ${err}`);
        setError(true);
      });
  }, []);

  return (
    <div>
      <div className={classes.container}>
        {showInfo ? (
          <div>
            <Synopsis
              viewEpisodesAction={setShowEpisodes}
              showInfo={showInfo}
            />
            {!showEpisodes ? (
              <>
                <Hr />
                <Stats showInfo={showInfo} />

                <Hr />
                <CharactersDisplay showInfo={showInfo} />
              </>
            ) : (
              <EpisodesListing showInfo={showInfo} />
            )}
          </div>
        ) : error ? (
          'There was an error, try again'
        ) : (
          <Loading message="Fetching info, please wait" />
        )}
      </div>

      {/* {apiShowInfo && (
        <div className={classes.episodesContainer}>
          {[...Array(apiShowInfo.episodes)].map((e, i) => (
            <div className={classes.episode}>
              <EpisodeBox
                background={apiShowInfo.bannerImage}
                epNumber={i + 1}
              />
            </div>
          ))}
        </div>
      )}
      {magnetURI ? (
        <div>
          {magnetURI.map((show, index) => {
            return Object.keys(show).map((key, index2) => {
              return (
                <div>
                  {key}: {show[key]['720p']}
                  <Download magnetURI={show[key]['720p']} />
                </div>
              );
            });
          })}
        </div>
      ) : (
        <div>fetching</div>
      )} */}
    </div>
  );
};

export default withRouter(ShowInfo);
