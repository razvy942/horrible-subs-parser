import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AnimeContainer from './UI/AnimeContainer';
import classes from './MainPage.module.css';

const AllShows = () => {
  const [allShows, setAllShows] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/horriblesubs/get-all?page=${currentPage}`)
      .then(res => {
        console.log(res);
        setAllShows(res.data);
      })
      .catch(err => {
        console.log(`Error fetching shows ${err}`);
      });
  }, [currentPage]);

  return (
    <div>
      <h1>All Shows</h1>
      <div className={classes.container}>
        {allShows ? (
          Object.keys(allShows).map((show, index) => {
            return (
              <div key={index}>
                <AnimeContainer
                  seriesTitle={show}
                  seriesDesc={allShows[show].desc}
                  seriesImage={allShows[show].img}
                />
              </div>
            );
          })
        ) : (
          <p>loading...</p>
        )}
      </div>
      <div className={classes.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous page
        </button>
        <p>{currentPage}</p>
        <button onClick={() => setCurrentPage(currentPage + 1)}>
          Next page
        </button>
      </div>
    </div>
  );
};

export default AllShows;
