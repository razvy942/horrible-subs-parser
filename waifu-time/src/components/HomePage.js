import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AnimeContainer from './UI/AnimeContainer';
import classes from './MainPage.module.css';

const HomePage = () => {
  const [currentSeasonShows, setCurrentSeasonShows] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/horriblesubs/get-latest')
      .then(res => {
        console.log(res);
        setCurrentSeasonShows(res.data);
      })
      .catch(err => {
        console.log(`Error fetching latest shows ${err}`);
      });
  }, []);

  return (
    <div>
      <h1>Latest Releases</h1>
      <div className={classes.container}>
        {currentSeasonShows ? (
          Object.keys(currentSeasonShows).map((show, index) => (
            <div key={index}>
              <AnimeContainer
                seriesTitle={show}
                seriesDesc={currentSeasonShows[show].desc}
                seriesImage={currentSeasonShows[show].img}
              />
            </div>
          ))
        ) : (
          <p>loading...</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
