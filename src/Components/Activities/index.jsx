import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './activities.module.css';
import Table from './Table';
// import AddForm from './AddForm';
// import EditForm from './EditForm';

function Activities() {
  const [activities, setActivities] = useState([]);
  // const [currentName, setCurrentName] = useState('');
  // const [currentDes, setCurrentDes] = useState('');
  // const [currentId, setCurrentId] = useState('');

  const onDelete = async (id) => {
    try {
      const response = window.confirm('Are you sure you want to delete this activity?');
      if (response) {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
          method: 'DELETE'
        });
        const data = await res.json();
        setActivities([...activities.filter((activity) => activity._id !== id)]);
        return data;
      }
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
      <h2 className={styles.title}>Activities Management</h2>
      <Table activities={activities} onDelete={onDelete} />
      <div className={styles.btnSection}>
        <Link to="/activities/create">
          <button>Add</button>
        </Link>
      </div>
      {/* {showAdd && (
        <AddForm
          onSubmit={onSubmit}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
        />
      )}
      {showEdit && (
        <EditForm
          onSubmit={onSubmit}
          currentName={currentName}
          currentDes={currentDes}
          setCurrentName={setCurrentName}
          setCurrentDes={setCurrentDes}
          onEdit={onEdit}
          currentId={currentId}
          setShowEdit={setShowEdit}
          showEdit={showEdit}
        />
      )} */}
    </section>
  );
}

export default Activities;
