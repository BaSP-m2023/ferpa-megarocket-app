import React from 'react';
import styles from './table.module.css';

const Table = ({
  activities,
  showEdit,
  setShowEdit,
  setShowAdd,
  setCurrentName,
  setCurrentDes,
  setCurrentId,
  onDelete
}) => {
  return (
    <table className={styles.table}>
      <tbody>
        <tr className={styles.trHead}>
          <th className={styles.thName}>Activity</th>
          <th className={styles.thDes}>Description</th>
          <th className={styles.thStatus}>Status</th>
          <th className={styles.thIcon}>Edit</th>
          <th className={styles.thIcon}>Delete</th>
        </tr>
        {activities.map((activity) => {
          return (
            <tr className={styles.trBody} key={activity?._id}>
              <td>{activity?.name}</td>
              <td className={styles.thDes}>{activity?.description}</td>
              <td className={styles.thStatus}>{activity?.isActive ? 'Active' : 'Inactive'}</td>
              <td className={styles.tdIcon}>
                <img
                  className={styles.icon}
                  src="/assets/images/edit-icon.svg"
                  alt={'Edit'}
                  onClick={() => {
                    setShowEdit(!showEdit);
                    setShowAdd(false);
                    setCurrentName(activity.name);
                    setCurrentDes(activity.description);
                    setCurrentId(activity._id);
                  }}
                />
              </td>
              <td className={styles.tdIcon}>
                <img
                  className={styles.icon}
                  src="/assets/images/delete-icon.svg"
                  alt={'Delete'}
                  onClick={() => {
                    onDelete(activity._id);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
