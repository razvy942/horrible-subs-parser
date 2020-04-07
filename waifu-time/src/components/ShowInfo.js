import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Download from '../helpers/Download';
import classes from './ShowInfo.module.css';

const ShowInfo = (props) => {
  const [showInfo, setShowInfo] = useState(null);
  const [error, setError] = useState(false);
  const [magnetURI, setMagnetURI] = useState([]);

  useEffect(() => {
    const title = props.match.params.title;

    axios
      .get(`http://127.0.0.1:5000/horriblesubs/get-show/${title}`)
      .then((res) => {
        setShowInfo(res.data);
      })
      .catch((err) => {
        console.log(`Error fetching ${title}'s details: ${err}`);
        setError(true);
      });

    // Get magnets
    axios
      .get(`http://127.0.0.1:5000/horriblesubs/get-episode/${title}/${'01'}`)
      .then((res) => {
        setMagnetURI(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(`Error fetching ${title}'s details: ${err}`);
        setError(true);
      });
  }, []);

  return (
    <div className={classes.container}>
      {showInfo ? (
        <div>
          {Object.keys(showInfo).map((show, index) => {
            return (
              <div className={classes.infoContainer} key={index}>
                <div className={classes.leftView}>
                  <img
                    className={classes.showInfoImg}
                    src={
                      showInfo[show].img.startsWith('https://horriblesubs.info')
                        ? showInfo[show].img
                        : 'https://horriblesubs.info' + showInfo[show].img
                    }
                    alt={`Cover art for ${show}`}
                  ></img>
                </div>
                <div className={classes.rightView}>
                  <span className={classes.title}>{show}</span>
                  <span className={classes.description}>
                    {showInfo[show].desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : error ? (
        'There was an error, try again'
      ) : (
        'Loading'
      )}
      <hr />
      <h1>Episodes</h1>
      {magnetURI ? (
        <div>
          here is ur episode
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
      )}
    </div>
  );
};

export default withRouter(ShowInfo);
