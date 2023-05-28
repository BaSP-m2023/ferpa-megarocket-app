import React from 'react';
import styles from './super-admins.module.css';
import { useEffect, useState } from 'react';

const Table = ({ list }) => {
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
    <table>
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
                className={`${togglePass.includes(superAdmin._id) ? styles.pass : ''} ${
                  styles.tdText
                }`}
              >
                {superAdmin.password}
              </td>
              <td className={styles.tdBtn}>
                <button onClick={() => toggler(superAdmin._id)}>Ver</button>
              </td>
              <td className={styles.tdBtn}>
                <button> Edit</button>
              </td>
              <td className={styles.tdBtn}>
                <button>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
