import React from 'react';
import styles from './button.module.css';

const Button = ({ text, clickAction, variant, disabled, submitting, testid }) => {
  let classNameStyle = styles[variant];
  return (
    <button
      type={submitting ? 'submit' : 'button'}
      onClick={clickAction}
      className={`${styles.btn} ${classNameStyle}`}
      disabled={disabled}
      data-testid={testid}
    >
      {text}
    </button>
  );
};

export default Button;
