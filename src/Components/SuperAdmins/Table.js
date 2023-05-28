import React from 'react';
import styles from './super-admins.module.css';
import { useEffect, useState } from 'react';

const Table = ({ list, deleteItem }) => {
  const ids = list.map((supAd) => supAd._id);
  const [togglePass, setTogglePass] = useState([]);

  const getTogglePass = () => {
    setTogglePass(ids);
  };

  useEffect(() => {
    getTogglePass();
  }, []);

  const toggler = (id) => {
    let newToggle = [...togglePass];
    if (newToggle.includes(id)) {
      newToggle = newToggle.filter((index) => index !== id);
    } else {
      newToggle.push(id);
    }
    setTogglePass(newToggle);
  };

  return (
    <table id={styles.table}>
      <thead>
        <tr>
          <th>Email</th>
          <th>Password</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {list.map((superAdmin) => {
          return (
            <tr key={superAdmin._id}>
              <td className={styles.tdText}>{superAdmin.email}</td>
              <td
                className={`${togglePass.includes(superAdmin._id) ? '' : styles.pass} ${
                  styles.tdText
                }`}
              >
                {superAdmin.password}
              </td>
              <td className={styles.tdBtn}>
                <button id={styles.passBtn} onClick={() => toggler(superAdmin._id)}></button>
              </td>
              <td className={styles.tdBtn}>
                <button id={styles.editBtn}></button>
              </td>
              <td className={styles.tdBtn}>
                <button id={styles.deleteBtn} onClick={() => deleteItem(superAdmin._id)}></button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
