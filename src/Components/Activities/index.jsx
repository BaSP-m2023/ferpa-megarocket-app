import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities } from '../../redux/activities/thunks';
import styles from './activities.module.css';
import Table from './Table';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import Loader from '../Shared/Loader';

function Activities() {
  const { data, isPending, message, success, error } = useSelector((state) => state.activities);
  const [modalMessage, setModalMessage] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      setShowModal(!showModal);
      setModalMessage(message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      // setMessage(data.message);
      setConfirmModal(!confirmModal);
      setDeleteModal(!deleteModal);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getActivities(dispatch);
  }, [dispatch]);

  if (isPending) {
    return (
      <section className={styles.container}>
        <div className={styles.list}>
          <div className={styles.header}>
            <h2 className={styles.title}>Activities</h2>
            <Link to="/activities/create">
              <Button text={'Add'} variant={'add'} />
            </Link>
          </div>
          <Loader />
        </div>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <div className={styles.list}>
        <div className={styles.header}>
          <h2 className={styles.title}>Activities</h2>
          <Link to="/activities/create">
            <Button text={'Add'} variant={'add'} />
          </Link>
        </div>
        <Modal
          onClose={() => setShowModal(false)}
          isOpen={showModal}
          title={modalMessage}
          success
        />
        {error ? (
          <p className={styles.dataError}>{message}</p>
        ) : (
          <Table
            activities={data}
            onDelete={onDelete}
            message={message}
            confirmModal={confirmModal}
            deleteModal={deleteModal}
            setConfirmModal={setConfirmModal}
            setDeleteModal={setDeleteModal}
          />
        )}
      </div>
    </section>
  );
}

export default Activities;
