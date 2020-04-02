import React from 'react';

const AnimeContainer = ({ seriesImage, seriesDesc }) => {
  const img = formatImage(seriesImage);

  return (
    <div>
      <p>{seriesDesc}</p>
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
