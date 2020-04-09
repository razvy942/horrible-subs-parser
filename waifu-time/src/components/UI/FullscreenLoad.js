import React, { useState, useEffect } from 'react';

import Modal from './Modal';
import Spinner from './Spinners/ModalSpinner';
import Button from './Button';
import classes from './NavBar.module.css';

const FullscreenLoad = ({ handleHide }) => {
  const [isMagnetAdded, setIsMagnetAdded] = useState(false);
  const [errors, setErrors] = useState(false);

  return (
    <div>
      <Modal>
        <div className={classes.modal}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
            }}
          >
            <Spinner />
            <div
              style={{
                marginBottom: '100px',
              }}
            >
              <p style={{ fontSize: '1.1rem' }}>
                Fetching torrent, please wait...
              </p>

              <Button text={'Cancel'} clickAction={handleHide} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FullscreenLoad;
