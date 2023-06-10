import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './super-admins.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';

const Table = ({ superadmins, deleteItem, message }) => {
  const [visiblePasswords, setVisiblePasswords] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [superadminIdToDelete, setSuperadminIdToDelete] = useState(null);

  const togglePasswordVisibility = (index) => {
    const updatedVisiblePasswords = [...visiblePasswords];
    updatedVisiblePasswords[index] = !updatedVisiblePasswords[index];
    setVisiblePasswords(updatedVisiblePasswords);
  };

  const handleDeleteSuperAdmin = (superadminId) => {
    deleteItem(superadminId);
    setDeleteModal(true);
  };

  return (
    <table className={styles.table}>
      <tbody className={styles.tbody}>
        <tr className={styles.tr}>
          <th className={styles.th}>Email:</th>
          <th className={styles.th}>Password:</th>
        </tr>
        {superadmins.map((superadmin, index) => (
          <tr key={superadmin?._id} className={styles.trBody}>
            <td className={styles.td}>{superadmin?.email}</td>
            <td className={styles.td}>
              {visiblePasswords[index]
                ? superadmin?.password
                : '*'.repeat(superadmin?.password.length)}
            </td>
            <td className={styles.td}>
              <Button variant={'seePassword'} clickAction={() => togglePasswordVisibility(index)} />
            </td>
            <td className={styles.td}>
              <Link to={`/super-admins/edit/${superadmin._id}`}>
                <Button variant={'edit'} />
              </Link>
            </td>
            <td className={styles.td}>
              <Button
                variant={'deleteIcon'}
                clickAction={() => {
                  setConfirmModal(true);
                  setSuperadminIdToDelete(superadmin._id);
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
      <Modal
        warning
        isOpen={confirmModal}
        title={'Delete SuperAdmin'}
        text={'Are you sure you want to delete this SuperAdmin?'}
        onClose={() => setConfirmModal(false)}
      >
        <Button text={'Cancel'} variant={'white'} clickAction={() => setConfirmModal(false)} />
        <Button
          text={'Delete'}
          variant={'delete'}
          clickAction={() => {
            handleDeleteSuperAdmin(superadminIdToDelete);
            setConfirmModal(false);
          }}
        />
      </Modal>
      <Modal
        isOpen={deleteModal}
        title={'Super Admin deleted'}
        text={message}
        onClose={() => setDeleteModal(false)}
      >
        <Button text={'OK'} variant={'add'} clickAction={() => setDeleteModal(false)} />
      </Modal>
    </table>
  );
};

export default Table;
