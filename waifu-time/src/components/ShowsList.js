import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AnimeContainer from './UI/AnimeContainer';

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
      <button onClick={() => setCurrentPage(currentPage - 1)}>
        Previous page
      </button>
      <p>{currentPage}</p>
      <button onClick={() => setCurrentPage(currentPage + 1)}>Next page</button>
      {allShows ? (
        Object.keys(allShows).map((show, index) => {
          return (
            <>
              <p key={index}>{show}</p>
              <AnimeContainer
                seriesDesc={allShows[show].desc}
                seriesImage={allShows[show].img}
              />
            </>
          );
        })
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default AllShows;
