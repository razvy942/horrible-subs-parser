import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Modal from './Modal';
import Slider from './Slider';
import classes from './NavBar.module.css';

const NavBar = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  const handleShow = () => {
    setShowModal(true);
  };

  const handleHide = () => {
    setShowModal(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      setShowModal(false);
    }
  };

  const switchThemes = () => {
    if (!darkTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      setDarkTheme(true);
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      setDarkTheme(false);
    }
  };

  const modal = showModal ? (
    <Modal>
      <div className={classes.modal}>
        <button onClick={handleHide} className={classes.closeButton}>
          X
        </button>
        <div>INSERT LOGIN FORM HERE</div>

        <button onClick={handleHide}>Hide modal</button>
      </div>
    </Modal>
  ) : null;

  return (
    <div className={classes.navBar} onKeyDown={(e) => handleKeyPress(e)}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/all-shows">See All shows</Link>
        </li>
        <li>
          <Link to="/player">Player link</Link>
        </li>
        <li>
          <Link to="/manage-downloads">Manage Downloads</Link>
        </li>
        <li>
          <button onClick={handleShow}>Login</button>
          {modal}
        </li>

        <li style={{ display: 'flex', alignItems: 'center' }}>
          <Slider switchThemes={switchThemes} isActive={darkTheme} />
          <span style={{ marginLeft: '10px' }}>Enable dark mode</span>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
