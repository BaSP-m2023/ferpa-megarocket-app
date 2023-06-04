import React from 'react';
import styles from './addform.module.css';

const AddForm = ({ onSubmit, name, setName, description, setDescription }) => {
  return (
    <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
      <div className={styles.inputGroup}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Activity name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Description</label>
        <textarea
          type="text"
          placeholder="Activity description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Status</label>
        <input type="checkbox" />
      </div>
      <button className={styles.confirmAdd} type="submit">
        Add
      </button>
    </form>
  );
};

export default AddForm;
