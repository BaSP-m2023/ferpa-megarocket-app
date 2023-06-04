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
  // const onEdit = async (id) => {
  //   const index = activities.findIndex((activity) => activity._id === id);
  //   try {
  //     const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
  //       method: 'PUT',
  //       body: JSON.stringify({
  //         name: currentName,
  //         description: currentDes,
  //         isActive: true
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     const data = await res.json();
  //     const update = [...activities];
  //     update[index] = data.data;
  //     console.log(update[index]);
  //     setActivities(update);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
