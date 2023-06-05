import React from 'react';
import styles from './super-admins.module.css';
import List from './List';

const Table = ({ list, deleteItem, updateItem }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.tr}>
          <th className={styles.thead}>Email</th>
          <th className={styles.thead}>Password</th>
        </tr>
      </thead>
      <List list={list} deleteItem={deleteItem} updateItem={updateItem} />
    </table>
  );
};

export default Table;
