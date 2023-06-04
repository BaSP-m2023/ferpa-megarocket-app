import React from 'react';
import styles from './inputs.module.css';

const TextArea = ({ value, onChangeArea, placeholder }) => {
  return (
    <>
      <label className={styles.label}></label>
      <textarea
        className={`${styles.input} ${styles.textarea}`}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChangeArea(e.target.value)}
      ></textarea>
    </>
  );
};

export default TextArea;
