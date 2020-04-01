import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllShows = () => {
  const [allShows, setAllShows] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/horriblesubs/get-all')
      .then(res => {
        console.log(res);
        setAllShows(res.data);
      })
      .catch(err => {
        console.log(`Error fetching shows ${err}`);
      });
  }, []);

  return (
    <div>
      <h1>All Shows</h1>
      {allShows ? (
        Object.keys(allShows).map((show, index) => <p key={index}>{show}</p>)
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default AllShows;
