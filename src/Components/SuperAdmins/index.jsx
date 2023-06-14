import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSuperAdmins } from '../../redux/superadmins/thunks';
import { Link } from 'react-router-dom';
import styles from './super-admins.module.css';
import Table from './table';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import Loader from '../Shared/Loader';

const SuperAdmins = () => {
  const { loading, error, success, message } = useSelector((state) => state.superadmins);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleModal = () => {
    setShowModal(!showModal);
    setTimeout(() => {
      setShowModal();
    }, 2000);
  };

  useEffect(() => {
    if (success) {
      handleModal();
      setModalMessage(message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getSuperAdmins(dispatch);
  }, [dispatch]);

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
  } else if (error) {
    return (
      <section className={styles.container}>
        <section className={styles.list}>
          <div className={styles.header}>
            <h1 className={styles.title}>Super Admin</h1>
            <Link to="/super-admins/create">
              <Button text={'Add'} variant={'add'} />
            </Link>
          </div>
          <div>
            <p className={styles.error}>{error}</p>
          </div>
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
        <Table />
      </section>
      <Modal onClose={() => setShowModal(false)} isOpen={showModal} tittle={modalMessage} success />
    </section>
  );
};

export default SuperAdmins;
