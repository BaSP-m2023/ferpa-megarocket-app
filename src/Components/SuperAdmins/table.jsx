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

  const handleDeleteSuperAdmin = (superadminId) => {
    setTimeout(() => {
      deleteItem(superadminId);
    }, 20);
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
              <Modal //apertura de modal para borrar
                warning
                isOpen={confirmModal}
                title={'Delete SuperAdmin'}
                text={'Are you sure you want to delete this SuperAdmin?'}
                onClose={() => setConfirmModal(!confirmModal)}
              >
                <Button
                  text={'Cancel'}
                  variant={'white'}
                  clickAction={() => setConfirmModal(!confirmModal)}
                />
                <Button
                  text={'Delete'}
                  variant={'delete'}
                  clickAction={() => {
                    handleDeleteSuperAdmin(superadmin._id);
                    setConfirmModal(!confirmModal);
                  }}
                />
              </Modal>
              <Modal
                isOpen={deleteModal}
                title={'Super Admin deleted'}
                text={message}
                onClose={() => {
                  setDeleteModal(!deleteModal);
                }}
              >
                <Button
                  text={'OK'}
                  variant={'add'}
                  clickAction={() => setDeleteModal(!deleteModal)}
                />
              </Modal>
              <tr key={superadmin?._id} className={styles.trBody}>
                <td className={styles.td}>{superadmin?.email}</td>
                <td className={styles.td}>
                  {visiblePasswords[index]
                    ? superadmin?.password
                    : '*'.repeat(superadmin?.password.length)}
                </td>
                <td className={styles.td}>
                  <Button
                    variant={'seePassword'}
                    clickAction={() => togglePasswordVisibility(index)}
                  />
                </td>
                <td className={styles.td}>
                  <Link to={`/super-admins/edit/${superadmin._id}`}>
                    <Button variant={'edit'} />
                  </Link>
                </td>
                <td className={styles.td}>
                  <Button
                    variant={'deleteIcon'}
                    clickAction={() => setConfirmModal(!confirmModal)}
                  />
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
