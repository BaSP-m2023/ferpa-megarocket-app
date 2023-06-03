import React from 'react';
import styles from './button.module.css';

const Button = ({ text, clickAction, type, disabled }) => {
  let classNameStyle;
  switch (type) {
    case 'delete':
      classNameStyle = styles.delete;
      break;
    case 'edit':
      classNameStyle = styles.edit;
      break;
    case 'add':
      classNameStyle = styles.add;
      break;
    case 'disabled':
      classNameStyle = styles.disabled;
      break;
    default:
      classNameStyle = styles.white;
  }
  return (
    <button onClick={clickAction} className={classNameStyle} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
