import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AnimeContainer from './UI/AnimeContainer';
import Button from './UI/Button';
import classes from './MainPage.module.css';

const AllShows = () => {
  const [allShows, setAllShows] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/horriblesubs/get-all?page=${currentPage}`)
      .then((res) => {
        console.log(res);
        setAllShows(res.data);
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      })
      .catch((err) => {
        console.log(`Error fetching shows ${err}`);
      });
  }, [currentPage]);

  const changePage = (increment = true) => {
    setAllShows(null);
    if (increment) setCurrentPage(currentPage + 1);
    else setCurrentPage(currentPage - 1);
  };

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
        <Button
          isDisabled={currentPage === 1}
          clickAction={() => changePage(false)}
          text={'Previous page'}
        />

        <p>{currentPage}</p>
        <Button text={'Next Page'} clickAction={changePage} />
      </div>
    </div>
  );
};

export default AllShows;
