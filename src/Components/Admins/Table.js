import { useState } from 'react';
import UpdateForm from './UpdateForm';
import styles from './admins.module.css';

const Table = ({ admins, deleteAdmin, updateAdmin }) => {
  const [showEditForm, setEditForm] = useState(false);
  const [adminToUpdate, setId] = useState('');

  const setupEditForm = (admin = '') => {
    setId(admin);
    setEditForm(!showEditForm);
  };

  return (
    <table className={styles.table}>
      <tbody className={styles.tbody}>
        <tr className={styles.thead}>
          <th>Name</th>
          <th>City</th>
          <th>Email</th>
          <th></th>
          <th></th>
        </tr>
        {admins.map((admin) => {
          return (
            <tr className={styles.tr} key={admin._id}>
              <td>{admin.firstName}</td>
              <td>{admin.city}</td>
              <td>{admin.email}</td>
              <td></td>
              <td className={styles.icons}>
                <img src="/assets/images/edit-icon.svg" onClick={() => setupEditForm(admin)} />
                <img src="/assets/images/delete-icon.svg" onClick={() => deleteAdmin(admin._id)} />
              </td>
            </tr>
          );
        })}
      </tbody>
      {showEditForm && (
        <UpdateForm close={setupEditForm} updateAdmin={updateAdmin} admin={adminToUpdate} />
      )}
    </table>
  );
};

export default Table;
