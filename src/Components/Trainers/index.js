import { useEffect, useState } from 'react';
import Table from './Table';
import Form from './Form';
import styles from './trainers.module.css';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);

  const getTrainers = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}/api/trainers`);
    const data = await response.json();
    setTrainers(data.data);
  };

  const deleteTrainer = async (_id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/trainers/${_id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (!data.error) {
        setTrainers([...trainers.filter((trainer) => trainer._id !== _id)]);
      } else {
        throw data.message;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrainers();
  }, []);

  const addTrainer = ({ firstName, lastName, email }) => {
    const newTrainer = {
      firstName,
      lastName,
      email
    };
    setTrainers([...trainers, newTrainer]);
  };

  // const deleteTrainer = (_id) => {
  //   setTrainers([...trainers.filter((trainer) => trainer._id !== _id)]);
  //   console.log(_id);
  // };
  return (
    <section className={styles.container}>
      <h2>Trainers</h2>
      <Form addTrainer={addTrainer} />
      <Table data={trainers} deleteTrainer={deleteTrainer} />
    </section>
  );
};

export default Trainers;
