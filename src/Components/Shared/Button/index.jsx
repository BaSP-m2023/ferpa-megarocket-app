import React from 'react';
import styles from './button.module.css';

const Button = ({ text, clickAction, variant, disabled, submitting }) => {
  let classNameStyle = styles[variant];
  return (
    <button
      type={submitting ? 'submit' : 'button'}
      onClick={clickAction}
      className={`${styles.btn} ${classNameStyle}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
