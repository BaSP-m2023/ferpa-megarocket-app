import React from 'react';
import styles from './inputs.module.css';

export const Select = ({ value, placeholder, onChangeSelect, label, options, nameValue }) => {
  return (
    <>
      <label className={styles.label}>{label}</label>
      <select
        name={nameValue}
        className={`${styles.input} ${styles.select}`}
        value={value}
        onChange={onChangeSelect}
      >
        <option hidden>{placeholder}</option>
        {options.map((item) => {
          return (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export const Input = ({ labelText, onChangeInput, placeholder, value, nameValue, type }) => {
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

export const DatePicker = ({ value, onChangeDate, label, nameValue }) => {
  return (
    <>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type="date"
        name={nameValue}
        value={value}
        onChange={(e) => onChangeDate(e.target.value)}
      />
    </>
  );
};

export const TextArea = ({ value, onChangeArea, placeholder, label, nameValue }) => {
  return (
    <>
      <label className={styles.label}>{label}</label>
      <textarea
        className={`${styles.input} ${styles.textarea}`}
        type="text"
        value={value}
        name={nameValue}
        placeholder={placeholder}
        onChange={(e) => onChangeArea(e.target.value)}
      ></textarea>
    </>
  );
};
