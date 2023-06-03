import React from 'react';
import styles from './button.module.css';

const Button = ({ text, clickAction, type, disabled }) => {
  return (
    <button
      onClick={clickAction}
      className={() => {
        if (type === 'deleteButton') {
          return 'styles.deleteButton';
        } else if (type === 'editButton') {
          return 'styles.editButton';
        } else if (type === 'addButton') {
          return 'styles.addButton';
        } else if (type === 'disabledButton') {
          return 'styles.disabledButton';
        }
      }}
    >
      {text}
    </button>
  );
};

export default Button;
