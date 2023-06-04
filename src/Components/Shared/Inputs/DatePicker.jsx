import React from 'react';
import styles from './inputs.module.css';

const DatePicker = ({ value, onChangeDate }) => {
  return (
    <>
      <label className={styles.label}>Date</label>
      <input
        className={styles.input}
        type="date"
        name="date"
        value={value}
        onChange={(e) => onChangeDate(e.target.value)}
      />
    </>
  );
};

export default DatePicker;
