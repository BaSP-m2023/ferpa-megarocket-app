import React from 'react';
import styles from './super-admins.module.css';
import { useState } from 'react';

const List = ({ list, deleteItem, updateItem }) => {
  const [togglePass, setTogglePass] = useState([]);
  const [editUser, setEditUser] = useState();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const toggler = (id) => {
    let newToggle = [...togglePass];
    if (newToggle.includes(id)) {
      newToggle = newToggle.filter((index) => index !== id);
    } else {
      newToggle.push(id);
    }
    setTogglePass(newToggle);
  };

  const handleEditClick = (userId) => {
    const admin = list.find((admin) => admin._id === userId);
    setEmail(admin.email);
    setPass(admin.password);
    setEditUser(userId);
  };

  const handleCancelClick = () => {
    setEditUser();
  };

  const handleSaveClick = (userId, email, pass) => {
    updateItem(userId, email, pass);
    setEditUser();
  };

  return (
    <tbody className={styles.tbody}>
      {list.map((superAdmin) => {
        return (
          <tr className={styles.tr} key={superAdmin._id}>
            <td className={styles.td}>
              {editUser === superAdmin._id ? (
                <>
                  <label>New Email: </label>
                  <input
                    className={styles.supAdmInput}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </>
              ) : (
                superAdmin.email
              )}
            </td>
            <td className={styles.td}>
              {editUser === superAdmin._id ? (
                <>
                  <label>New Pass: </label>
                  <input
                    className={styles.supAdmInput}
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  ></input>
                </>
              ) : (
                <p className={togglePass.includes(superAdmin._id) ? '' : styles.pass}>
                  {superAdmin.password}
                </p>
              )}
            </td>
            <td className={styles.td}>
              <button className={styles.passBtn} onClick={() => toggler(superAdmin._id)}></button>
            </td>
            <td className={styles.td}>
              {editUser === superAdmin._id ? (
                <button
                  className={`${styles.supAdmBtn} ${styles.acceptBtn}`}
                  onClick={() => handleSaveClick(superAdmin._id, email, pass)}
                >
                  Accept
                </button>
              ) : (
                <button
                  onClick={() => handleEditClick(superAdmin._id)}
                  className={styles.editBtn}
                ></button>
              )}
            </td>
            <td className={styles.td}>
              {editUser === superAdmin._id ? (
                <button
                  className={`${styles.supAdmBtn} ${styles.cancelBtn}`}
                  onClick={() => handleCancelClick()}
                >
                  Cancel
                </button>
              ) : (
                <button
                  className={styles.deleteBtn}
                  onClick={() => deleteItem(superAdmin._id)}
                ></button>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default List;
