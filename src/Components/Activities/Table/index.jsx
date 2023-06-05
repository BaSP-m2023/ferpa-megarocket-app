import React from 'react';
import styles from './table.module.css';
import { Link } from 'react-router-dom';

const Table = ({ activities, onDelete }) => {
  return (
    <table className={styles.table}>
      <tbody className={styles.tbody}>
        <tr className={styles.trHead}>
          <th className={styles.thName}>Activity</th>
          <th className={styles.thDes}>Description</th>
          <th className={styles.thStatus}>Status</th>
          <th className={styles.thIcon}></th>
          <th className={styles.thIcon}></th>
        </tr>
        {activities.map((activity) => {
          return (
            <tr className={styles.trBody} key={activity?._id}>
              <td>{activity?.name}</td>
              <td className={styles.thDes}>{activity?.description}</td>
              <td className={styles.thStatus}>{activity?.isActive ? 'Active' : 'Inactive'}</td>
              <td className={styles.tdIcon}>
                <Link to={`/activities/edit/${activity._id}`}>
                  <img className={styles.icon} src="/assets/images/edit-icon.svg" alt={'Edit'} />
                </Link>
              </td>
              <td>
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
