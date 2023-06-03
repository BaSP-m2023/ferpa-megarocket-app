import React from 'react';
import styles from './super-admins.module.css';
import List from './List';

const Table = ({ list, deleteItem, updateItem }) => {
  return (
    <div>
      <h2 className={styles.titleTable}>Super Admin List</h2>
      <table id={styles.table}>
        <thead>
          <tr>
            <th className={styles.supAdmTh}>Email</th>
            <th className={styles.supAdmTh}>Password</th>
            <th className={styles.supAdmTh}></th>
            <th className={styles.supAdmTh}></th>
            <th className={styles.supAdmTh}></th>
          </tr>
        </thead>
        <List list={list} deleteItem={deleteItem} updateItem={updateItem} />
      </table>
    </div>
  );
};

export default Table;
