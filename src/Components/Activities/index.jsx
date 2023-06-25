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
  const { isPending, message, success, error } = useSelector((state) => state.activities);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorModal, setErrorModal] = useState(true);
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
    getActivities(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isPending) {
    return (
      <section className={styles.container}>
        <div className={styles.list}>
          <div className={styles.header}>
            <h2 className={styles.title}>Activities</h2>
          </div>
          <Loader />
        </div>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <div className={styles.list}>
        {error ? (
          <>
            <div className={styles.header}>
              <h2 className={styles.title}>Activities</h2>
            </div>
            <Modal onClose={() => setErrorModal(false)} isOpen={errorModal} title={message} error />
          </>
        ) : (
          <>
            <div className={styles.header}>
              <h2 className={styles.title}>Activities</h2>
              <Link to="/admins/home/activities/create">
                <Button text={'Add'} variant={'add'} testid={'add-btn'} />
              </Link>
            </div>
            <Modal
              onClose={() => setShowModal(false)}
              isOpen={showModal}
              title={modalMessage}
              success
            />
            <Table />
          </>
        )}
      </div>
    </section>
  );
}

export default Activities;
