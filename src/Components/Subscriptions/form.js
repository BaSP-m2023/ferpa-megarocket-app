import React, { useState } from 'react';
import styles from './subscriptions.module.css';

const Form = ({ onCreate, getClassID, getMemberID }) => {
  const [formData, setFormData] = useState({
    classId: '',
    memberId: '',
    date: ''
  });

  console.log('getclassid', getClassID);
  console.log('getmemberid', getMemberID);

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
        <select
          type="text"
          name="classId"
          value={formData.classId}
          onChange={handleChange}
          required
        >
          {getClassID.map((item) => {
            return (
              <option key={item._id} value={item._id}>
                {`${item._id}`}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles.inputBox}>
        <label>Member ID:</label>
        <select
          type="text"
          name="memberId"
          value={formData.memberId}
          onChange={handleChange}
          required
        >
          {getMemberID.map((item) => {
            return (
              <option key={item._id} value={item._id}>
                {`${item._id} ${item.lastName}`}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles.inputBox}>
        <label>Date:</label>
        <input
          className={styles.submitBtn}
          type="date"
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
