import React from 'react';

// receive props in the form of { name, path, downloadSpeed, progress }
const DownloadsListElement = ({ showInfo }) => {
  return (
    <div>
      {showInfo.name}: speed: {showInfo.downloadSpeed} progress:{' '}
      {showInfo.progress}
    </div>
  );
};

export default DownloadsListElement;
