import { useEffect, useState } from 'react';
import styles from './trainers.module.css';
// import TrainerAddForm from './addFormTrainer';
// import editFormTrainer from './editFormTrainer';
import { Link } from 'react-router-dom';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  // const [toggleAdd, setToggleAdd] = useState(false);
  // const [toggleEdit, setToggleEdit] = useState(false);

  const getTrainers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers`);
      const data = await response.json();
      setTrainers(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTrainer = async (_id) => {
    const option = window.confirm('Are you sure??');
    if (option) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/${_id}`, {
          method: 'DELETE'
        });
        const { message, error } = await response.json();
        if (!error) {
          setTrainers([...trainers.filter((trainer) => trainer._id !== _id)]);
        } else {
          throw message;
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  useEffect(() => {
    getTrainers();
  }, []);

  return (
    <section className={styles.container}>
      <h2>Trainers</h2>
      <Link to={'/trainers/addFormTrainers'}>
        <button>Add</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Dni</th>
            <th>Phone</th>
            <th>Email</th>
            <th>City</th>
            <th>Password</th>
            <th>Salary</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.dni}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.city}</td>
                <td>{item.password}</td>
                <td>{item.salary}</td>
                <td>
                  <Link to={`/trainers/addFormTrainer/${item._id}`}>
                    <button>Edit</button>
                  </Link>
                  <button className={styles.deleteBtn} onClick={() => deleteTrainer(item._id)}>
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* {toggleEdit && <editFormTrainer trainers={trainers} />} */}
    </section>
  );
};

export default Trainers;
