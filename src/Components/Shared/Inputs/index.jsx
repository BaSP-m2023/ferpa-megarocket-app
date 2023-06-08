import React from 'react';
import styles from './inputs.module.css';

export const Select = ({ value, placeholder, onChangeSelect, label, options, nameValue, dark }) => {
  return (
    <>
      <label className={dark ? `${styles.label} ${styles.dark}` : `${styles.label}`}>{label}</label>
      <select
        name={nameValue}
        className={
          dark
            ? `${styles.input} ${styles.dark} ${styles.select}`
            : `${styles.input} ${styles.select}`
        }
        value={value}
        onChange={onChangeSelect}
      >
        <option hidden>{placeholder}</option>
        {options.map((item) => {
          return (
            <option key={item._id} value={item.value}>
              {item.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export const Input = ({ labelText, onChangeInput, placeholder, value, nameValue, type, dark }) => {
  return (
    <>
      <label className={dark ? `${styles.label} ${styles.dark}` : `${styles.label}`}>
        {labelText}
      </label>
      <input
        className={dark ? `${styles.input} ${styles.dark}` : `${styles.input}`}
        type={type === 'password' ? 'password' : 'text'}
        onChange={onChangeInput}
        placeholder={placeholder}
        value={value}
        name={nameValue}
      />
    </>
  );
};

export const DatePicker = ({ value, onChangeDate, label, nameValue, dark }) => {
  return (
    <>
      <label className={dark ? `${styles.label} ${styles.dark}` : `${styles.label}`}>{label}</label>
      <input
        className={dark ? `${styles.input} ${styles.dark}` : `${styles.input}`}
        type="date"
        name={nameValue}
        value={value}
        onChange={(e) => onChangeDate(e.target.value)}
      />
    </>
  );
};

export const TextArea = ({ value, onChangeArea, placeholder, label, nameValue, dark }) => {
  return (
    <>
      <label className={dark ? `${styles.label} ${styles.dark}` : `${styles.label}`}>{label}</label>
      <textarea
        className={
          dark
            ? `${styles.input} ${styles.dark} ${styles.textarea}`
            : `${styles.input} ${styles.textarea}`
        }
        type="text"
        value={value}
        name={nameValue}
        placeholder={placeholder}
        onChange={(e) => onChangeArea(e.target.value)}
      ></textarea>
    </>
  );
};
