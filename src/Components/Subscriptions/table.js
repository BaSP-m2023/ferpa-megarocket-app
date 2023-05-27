import React from 'react';
import styles from './subscriptions.module.css';
import Item from './item';

const Table = ({ subscriptions }) => {
  return (
    <table className={styles.table}>
      <tbody className={styles.tbody}>
        <tr className={styles.thead}>
          <th>Class ID</th>
          <th>Member ID</th>
          <th>Date</th>
          <th></th>
        </tr>
        {subscriptions.map((subscription) => (
          <Item key={subscription._id} subscription={subscription} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
