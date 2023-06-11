import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSuperAdmins } from '../../redux/superadmins/thunks';
import { Link } from 'react-router-dom';
import styles from './super-admins.module.css';
import Table from './table';
import Button from '../Shared/Button';
import Loader from '../Shared/Loader';

function SuperAdmins() {
  const { data, loading, error } = useSelector((state) => state.superadmins);
  const [message, setMessage] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const dispatch = useDispatch();

  // const getSuperAdmins = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/`);
  //     const data = await response.json();
  //     setSuperAdmins(data.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  useEffect(() => {
    dispatch(getSuperAdmins());
  }, [dispatch]);

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      setMessage(data.message);
      setDeleteModal(true);
      // setSuperAdmins([...superAdmins.filter((superAdmins) => superAdmins._id !== id)]);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <section className={styles.container}>
        <section className={styles.list}>
          <div className={styles.header}>
            <h1 className={styles.title}>Super Admin</h1>
            <Link to="/super-admins/create">
              <Button text={'Add'} variant={'add'} />
            </Link>
          </div>
          <div className={styles.loader}>
            <Loader />
          </div>
        </section>
      </section>
    );
  } else if (error !== '') {
    return (
      <section className={styles.container}>
        <section className={styles.list}>
          <div className={styles.header}>
            <h1 className={styles.title}>Super Admin</h1>
            <Link to="/super-admins/create">
              <Button text={'Add'} variant={'add'} />
            </Link>
          </div>
          <p className={styles.dataError}>{error}</p>
        </section>
      </section>
    );
  }

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
          superadmins={data}
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
