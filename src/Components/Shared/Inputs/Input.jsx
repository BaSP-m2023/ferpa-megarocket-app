import React from 'react';
import styles from './inputs.module.css';

const Input = ({ labelText, onChangeInput, placeholder, value, nameValue, type }) => {
  return (
    <>
      <label className={styles.label}>{labelText}</label>
      <input
        className={styles.input}
        type={type === 'password' ? 'password' : 'text'}
        onChange={onChangeInput}
        placeholder={placeholder}
        value={value}
        name={nameValue}
      />
    </>
  );
};
export default Input;
