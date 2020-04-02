import React from 'react';
import classes from './AnimeContainer.module.css';

const AnimeContainer = ({ seriesTitle, seriesImage, seriesDesc }) => {
  const img = formatImage(seriesImage);

  return (
    <div className={classes.box}>
      <p>{seriesTitle}</p>
      {/* <p>{seriesDesc}</p> */}
      <img src={img} />
    </div>
  );
};

const formatImage = imgUrl => {
  let url = 'https://horriblesubs.info';
  if (!imgUrl.startsWith(url)) return url + imgUrl;
  return imgUrl;
};

export default AnimeContainer;
