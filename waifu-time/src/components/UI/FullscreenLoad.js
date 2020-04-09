import React, { useState, useEffect } from 'react';

import Modal from './Modal';
import classes from './NavBar.module.css';

const FullscreenLoad = ({ handleHide }) => {
  const [isMagnetAdded, setIsMagnetAdded] = useState(false);
  const [errors, setErrors] = useState(false);

  return (
    <div>
      <Modal>
        <div className={classes.modal}>
          <button onClick={handleHide} className={classes.closeButton}>
            X
          </button>
          <div>LOADING PLEASE WAIT</div>

          <button onClick={handleHide}>Hide modal</button>
        </div>
      </Modal>
    </div>
  );
};

export default FullscreenLoad;
