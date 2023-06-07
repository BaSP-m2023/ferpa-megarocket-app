import { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import styles from './activities.module.css';
import Table from './Table';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [message, setMessage] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.state) {
      setShowModal(!showModal);
      setMessage(location.state.message);
    }
    history.replace({ ...history.location, state: undefined });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      setMessage(data.message);
      setConfirmModal(!confirmModal);
      setDeleteModal(!deleteModal);
      setActivities([...activities.filter((activity) => activity._id !== id)]);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getActivities = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/`);
      const data = await res.json();
      setActivities(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getActivities();
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.list}>
        <div className={styles.header}>
          <h2 className={styles.title}>Activities</h2>
          <Link to="/activities/create">
            <Button text={'Add'} variant={'add'} />
          </Link>
        </div>
        <Modal onClose={() => setShowModal(false)} isOpen={showModal} title={message} success />
        <Table
          activities={activities}
          onDelete={onDelete}
          message={message}
          confirmModal={confirmModal}
          deleteModal={deleteModal}
          setConfirmModal={setConfirmModal}
          setDeleteModal={setDeleteModal}
        />
      </div>
    </section>
  );
}

export default Activities;
