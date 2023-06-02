import { useEffect, useState } from 'react';
import styles from './classes.module.css';
import Form from './Form/Form';
import Table from './Table/Table';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [activities, setActivities] = useState([]);
  const [trainers, setTrainers] = useState([]);

  const getClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/`);
      const { message, data, error } = await response.json();
      alert(message);

      if (!error) {
        setClasses([...classes, data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getActivities = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/`);
      const { message, data, error } = await response.json();
      alert(message);

      if (!error) {
        setActivities([...activities, data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTrainers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/`);
      const { message, data, error } = await response.json();
      alert(message);

      if (!error) {
        setTrainers([...trainers, data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getClasses();
    getActivities();
    getTrainers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addItem = async (klass) => {
    try {
      const newClass = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/`, {
        method: 'POST',
        body: JSON.stringify(klass),
        headers: {
          'Content-type': 'application/json'
        }
      });

      const { message, data, error } = await newClass.json();
      alert(message);

      if (!error) {
        setClasses([...classes, data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (_id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${_id}`, {
      method: 'DELETE'
    });
    const klass = classes.filter((klass) => klass._id === _id);
    alert(`Class ${klass[0].name} was deleted`);
    setClasses([...classes.filter((klass) => klass._id !== _id)]);
  };

  const updateClass = async (id, updatedClass) => {
    const adminIndex = classes.findIndex((klass) => klass._id === id);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedClass)
      });

      const { message, data, error } = await res.json();
      alert(message);

      if (!error) {
        const actualClasses = [...classes];
        actualClasses[adminIndex] = data;
        setClasses(actualClasses);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Classes</h2>
      <Table
        data={classes}
        deleteItem={deleteItem}
        onEditItem={updateClass}
        activities={activities}
        trainers={trainers}
      />
      <Form onAddItem={addItem} activities={activities} trainers={trainers} />
    </section>
  );
};

export default Classes;
