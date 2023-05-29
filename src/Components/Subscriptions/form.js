import React, { useState } from 'react';
import styles from './subscriptions.module.css';

const Form = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    classId: '',
    memberId: '',
    date: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
    setFormData({
      classId: '',
      memberId: '',
      date: ''
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputBox}>
        <label>Class ID:</label>
        <input
          type="text"
          name="classId"
          value={formData.classId}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.inputBox}>
        <label>Member ID:</label>
        <input
          type="text"
          name="memberId"
          value={formData.memberId}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.inputBox}>
        <label>Date:</label>
        <input
          className={styles.submitBtn}
          type="text"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Subs</button>
    </form>
  );
};

export default Form;
