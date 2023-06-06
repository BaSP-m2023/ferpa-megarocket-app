import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './super-admins.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';

const Table = ({
  superadmins,
  deleteItem,
  message,
  confirmModal,
  deleteModal,
  setConfirmModal,
  setDeleteModal
}) => {
  const [visiblePasswords, setVisiblePasswords] = useState([]);

  const togglePasswordVisibility = (index) => {
    const updatedVisiblePasswords = [...visiblePasswords];
    updatedVisiblePasswords[index] = !updatedVisiblePasswords[index];
    setVisiblePasswords(updatedVisiblePasswords);
  };

  return (
    <table className={styles.table}>
      <tbody className={styles.tbody}>
        <tr className={styles.tr}>
          <th className={styles.th}>Email:</th>
          <th className={styles.th}>Password:</th>
        </tr>
        {superadmins.map((superadmin, index) => {
          return (
            <>
              <Modal
                warning
                isOpen={confirmModal}
                title={'Delete SuperAdmin'}
                text={'Are you sure you want to delete this SuperAdmin?'}
                onClose={() => setConfirmModal(!confirmModal)}
              >
                <Button
                  text={'Cancel'}
                  type={'white'}
                  clickAction={() => setConfirmModal(!confirmModal)}
                />
                <Button
                  text={'Delete'}
                  type={'delete'}
                  clickAction={() => deleteItem(superadmin._id)}
                />
              </Modal>
              <Modal
                isOpen={deleteModal}
                title={message}
                success
                onClose={() => setDeleteModal(!deleteModal)}
              />
              <tr key={superadmin?._id} className={styles.trBody}>
                <td className={styles.td}>{superadmin?.email}</td>
                <td className={styles.td}>
                  {visiblePasswords[index]
                    ? superadmin?.password
                    : '*'.repeat(superadmin?.password.length)}
                </td>
                <td className={styles.td}>
                  <Button
                    type={'seePassword'}
                    clickAction={() => togglePasswordVisibility(index)}
                  />
                </td>
                <td className={styles.td}>
                  <Link to={`/super-admins/edit/${superadmin._id}`}>
                    <Button type={'edit'} />
                  </Link>
                </td>
                <td className={styles.td}>
                  <Button type={'deleteIcon'} clickAction={() => setConfirmModal(!confirmModal)} />
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
