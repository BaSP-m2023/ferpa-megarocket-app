import { useEffect, useState } from 'react';
import styles from './classes.module.css';
import Form from './Form/Form';
import Table from './Table/Table';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [activities, setActivities] = useState([]);
  const [trainers, setTrainers] = useState([]);

  const getClasses = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/`);
    const data = await response.json();
    setClasses(data.data);
  };

  // const getClass = async (_id) => {
  //   const response = await fetch(`${process.env.REACT_APP_API}/api/classes/${_id}`);
  //   const data = await response.json();
  //   return data;
  // };

  const getActivities = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/`);
    const data = await response.json();
    setActivities(data.data);
  };

  const getTrainers = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/`);
    const data = await response.json();
    setTrainers(data.data);
  };

  useEffect(() => {
    getClasses();
    getActivities();
    getTrainers();
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
      console.log(error);
    }
  };

  // const response = await fetch(`${process.env.REACT_APP_API}/api/classes/`, {
  //   method: 'POST',
  //   Headers: {
  //     'Content-type': 'application/json'
  //   },
  //   body: JSON.stringify({ activityId, day, hour })
  // });
  // const data = await response.json();
  // const newItem = {
  //   _id: (Math.floor = Math.random() * 1000),
  //   activityId: { name: activityId },
  //   day,
  //   hour
  // };
  //   setClasses([...classes, data]);
  // };

  const deleteItem = async (_id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${_id}`, {
      method: 'DELETE'
    });
    setClasses([...classes.filter((klass) => klass._id !== _id)]);
  };

  // const updateItem = async (_id) => {
  //   const classToUpdate = await getClass(_id);
  //   const updatedClass = {
  //     ...classToUpdate,
  //     day: data.day,
  //     hour: data.hour,
  //     slots: data.slots,
  //     activityId: { name: data.activityId.name }
  //   };

  //   const response = await fetch(`${process.env.REACT_APP_API}/api/classes/`, {
  //     method: 'PUT',
  //     Headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify(updatedClass)
  //   });
  //   const data = await response.json();
  // };

  return (
    <section className={styles.container}>
      <h2>Classes</h2>
      <Table data={classes} deleteItem={deleteItem} />
      <Form onAddItem={addItem} activities={activities} trainers={trainers} />
    </section>
  );
};

export default Classes;
