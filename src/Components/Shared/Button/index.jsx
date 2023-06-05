import React from 'react';
import styles from './button.module.css';

const Button = ({ text, clickAction, type, disabled }) => {
  let classNameStyle = styles[type];
  return (
    <button onClick={clickAction} className={`${styles.btn} ${classNameStyle}`} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
