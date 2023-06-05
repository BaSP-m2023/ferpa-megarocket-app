import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './activities.module.css';
import Table from './Table';
import Button from '../Shared/Button';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [message, setMessage] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

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
            <Button text={'Add'} type={'add'} />
          </Link>
        </div>
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
