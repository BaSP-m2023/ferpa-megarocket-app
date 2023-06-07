import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './super-admins.module.css';
import Table from './table';
import Button from '../Shared/Button';

function SuperAdmins() {
  const [superAdmins, setSuperAdmins] = useState([]);
  const [message, setMessage] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const getSuperAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/`);
      const data = await response.json();
      setSuperAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getSuperAdmins();
  }, []);

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      setMessage(data.message);
      setDeleteModal(confirmModal);
      setConfirmModal(!deleteModal);
      setSuperAdmins([...superAdmins.filter((superAdmins) => superAdmins._id !== id)]);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.container}>
      <section className={styles.list}>
        <div className={styles.header}>
          <h1 className={styles.title}>Super Admin</h1>
          <Link to="/super-admins/create">
            <Button text={'Add'} variant={'add'} />
          </Link>
        </div>
        <Table
          superadmins={superAdmins}
          deleteItem={deleteItem}
          message={message}
          confirmModal={confirmModal}
          deleteModal={deleteModal}
          setConfirmModal={setConfirmModal}
          setDeleteModal={setDeleteModal}
        />
      </section>
    </section>
  );
}

export default SuperAdmins;
