import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AnimeContainer from './UI/AnimeContainer';
import test from '../helpers/aniListApiWrapper';

const HomePage = () => {
  const [currentSeasonShows, setCurrentSeasonShows] = useState(null);

  useEffect(() => {
    test();

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
      {currentSeasonShows ? (
        Object.keys(currentSeasonShows).map((show, index) => (
          <>
            <p key={index}>{show}</p>
            <AnimeContainer
              seriesDesc={currentSeasonShows[show].desc}
              seriesImage={currentSeasonShows[show].img}
            />
          </>
        ))
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default HomePage;
