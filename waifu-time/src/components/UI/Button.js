import React from 'react';

import classes from './Button.module.css';

const Button = ({ text, clickAction, isDisabled }) => {
  const button = (
    <div onClick={clickAction} className={classes.button}>
      <span>{text}</span>
    </div>
  );

  return (
    <div
      onClick={!isDisabled && clickAction}
      className={
        isDisabled
          ? [classes.button, classes.disabledButton].join(' ')
          : classes.button
      }
    >
      <span>{text}</span>
    </div>
  );
};

export default Button;
