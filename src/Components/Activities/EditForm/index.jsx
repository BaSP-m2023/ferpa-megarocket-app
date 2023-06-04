import React from 'react';
import styles from './editform.module.css';

const EditForm = ({
  onSubmit,
  currentName,
  currentDes,
  setCurrentName,
  setCurrentDes,
  onEdit,
  currentId,
  setShowEdit,
  showEdit
}) => {
  return (
    <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
      <input
        type="text"
        placeholder={currentName}
        value={currentName}
        onChange={(e) => setCurrentName(e.target.value)}
      />
      <textarea
        type="text"
        placeholder={currentDes}
        value={currentDes}
        onChange={(e) => setCurrentDes(e.target.value)}
      />
      <button
        className={styles.confirmEdit}
        type="submit"
        onClick={() => {
          onEdit(currentId);
          setShowEdit(!showEdit);
        }}
      >
        Edit
      </button>
    </form>
  );
};

export default EditForm;
