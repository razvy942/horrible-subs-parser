import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import axios from 'axios';

import Download from '../helpers/Download';
import EpisodeBox from './EpisodeBox';
import Hr from './UI/HorizontalLine';
import Button from './UI/Button';
import anilist from '../helpers/aniListApiWrapper';
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

  // const getEpisodeMagnet = (epNumber) => {
  //   const title = props.match.params.title;

  //   axios
  //     .get(
  //       `http://127.0.0.1:5000/horriblesubs/get-episode/${title}/${epNumber}`
  //     )
  //     .then((res) => {
  //       const uri = res.data;
  //       let resolution = {};
  //       uri.forEach((show) => {
  //         Object.keys(show).forEach((key) => {
  //           resolution['720p'] = show[key]['720p'];
  //           resolution['1080p'] = show[key]['1080p'];
  //         });
  //       });

  //       setMagnetURI(res.data);
  //       console.log(resolution);
  //     })
  //     .catch((err) => {
  //       console.log(`Error fetching ${title}'s details: ${err}`);
  //       setError(true);
  //     });
  // };

  return (
    <div>
      <div className={classes.container}>
        {showInfo ? (
          <div>
            <div className={classes.infoContainer}>
              <div className={classes.leftView}>
                <img
                  className={classes.showInfoImg}
                  src={showInfo['image_url']}
                  alt={`Cover art for ${showInfo.title}`}
                ></img>
                <button
                  className={classes.episodesButton}
                  onClick={() => console.log(' go to episodes')}
                >{`View Episodes (${showInfo.episodes})`}</button>
              </div>
              <div className={classes.rightView}>
                <h1 className={classes.title}>{showInfo.title}</h1>
                <div className={classes.description}>{showInfo.synopsis}</div>
              </div>
            </div>
            <Hr />
            <div className={classes.ratingsDisplay}>
              <h1 style={{ textAlign: 'start' }}>Ratings</h1>
              <p style={{ textAlign: 'start' }}>{showInfo.score}</p>
              <div className={classes.scoreDistribution}>
                {Object.keys(showInfo.scores).map((score, index) => (
                  <span key={index}>
                    {score}: {showInfo.scores[score]['votes']}
                  </span>
                ))}
              </div>
            </div>
            <Hr />
            <div className={classes.charactersDisplay}>
              <h1 style={{ textAlign: 'start', marginBottom: '10px' }}>
                Characters
              </h1>
              {/* <div className={classes.charactersDisplay}> */}
              <Carousel
                slidesPerPage={10}
                animationSpeed={500}
                keepDirectionWhenDragging
              >
                {showInfo.characters.map((character, index) => (
                  <div key={index} className={classes.characterDisplay}>
                    <img
                      className={classes.characterPortrait}
                      src={character['image_url']}
                    />
                    <div>
                      <span>{character.name}</span>
                      <span>
                        {character['voice_actors'].map(
                          (i, index) =>
                            i.language === 'Japanese' && (
                              <span key={index}>{i.name}</span>
                            )
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </Carousel>
              {/* </div> */}
            </div>
          </div>
        ) : error ? (
          'There was an error, try again'
        ) : (
          'Loading'
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
