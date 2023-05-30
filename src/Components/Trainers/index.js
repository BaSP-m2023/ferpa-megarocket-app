import { useEffect, useState } from 'react';
import styles from './trainers.module.css';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [trainer, setTrainer] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    password: '',
    salary: ''
  });
  const [toggleAdd, setToggleAdd] = useState(false);

  const getTrainers = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}/api/trainers`);
    const data = await response.json();
    setTrainers(data.data);
  };

  const deleteTrainer = async (_id) => {
    const option = confirm('Are you sure??');
    if (option) {
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
    }
  };

  useEffect(() => {
    getTrainers();
  }, []);

  const addTrainer = ({ _id, firstName, lastName, dni, phone, email, city, password, salary }) => {
    const newTrainer = {
      _id,
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      password,
      salary
    };
    setTrainers([...trainers, newTrainer]);
  };

  const sendTrainer = async (iten) => {
    console.log(iten);
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/trainers/`, {
        method: 'POST',
        body: JSON.stringify(iten),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (!data.error) {
        addTrainer(data.data);
        setToggleAdd(false);
      } else {
        throw data.message;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeInput = (e) => {
    setTrainer({
      ...trainer,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    sendTrainer(trainer);
  };

  return (
    <section className={styles.container}>
      <h2>Trainers</h2>
      <button
        className={!toggleAdd ? styles.show : styles.hide}
        id="adding"
        onClick={() => {
          setToggleAdd(true);
          setTrainer({
            firstName: '',
            lastName: '',
            dni: '',
            phone: '',
            email: '',
            city: '',
            password: '',
            salary: ''
          });
        }}
      >
        Add
      </button>
      {toggleAdd && (
        <form onSubmit={onSubmit}>
          <div>
            <fieldset>
              <label htmlFor="firstName">Name</label>
              <input name="firstName" type="text" onChange={onChangeInput} />
            </fieldset>
            <fieldset>
              <label htmlFor="lastName">Last Name</label>
              <input name="lastName" type="text" onChange={onChangeInput} />
            </fieldset>
            <fieldset>
              <label htmlFor="dni">Dni</label>
              <input name="dni" type="text" onChange={onChangeInput} />
            </fieldset>
            <fieldset>
              <label htmlFor="phone">Phone</label>
              <input name="phone" type="text" onChange={onChangeInput} />
            </fieldset>
            <fieldset>
              <label>Email</label>
              <input name="email" type="text" onChange={onChangeInput} />
            </fieldset>
            <fieldset>
              <label htmlFor="city">City</label>
              <input name="city" type="text" onChange={onChangeInput} />
            </fieldset>
            <fieldset>
              <label htmlFor="password">Password</label>
              <input name="password" type="text" onChange={onChangeInput} />
            </fieldset>
            <fieldset>
              <label htmlFor="salary">Salary</label>
              <input name="salary" type="text" onChange={onChangeInput} />
            </fieldset>
          </div>
          <p></p>
          <button
            onClick={(e) => {
              e.preventDefault();
              setToggleAdd(false);
            }}
          >
            Cancel
          </button>
          <button type="submit">Add</button>
        </form>
      )}
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
                  <button>Edit</button>
                  <button className={styles.deleteBtn} onClick={() => deleteTrainer(item._id)}>
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <form>
        <fieldset>
          <label htmlFor="">Name</label>
          <input name="firstName" type="text" />
        </fieldset>
        <fieldset>
          <label htmlFor="">Last Name</label>
          <input name="lastName" type="text" />
        </fieldset>
        <fieldset>
          <label htmlFor="">Dni</label>
          <input name="dni" type="text" />
        </fieldset>
        <fieldset>
          <label htmlFor="">Phone</label>
          <input name="phone" type="text" />
        </fieldset>
        <fieldset>
          <label htmlFor="">Email</label>
          <input name="email" type="text" />
        </fieldset>
        <fieldset>
          <label htmlFor="">City</label>
          <input name="city" type="text" />
        </fieldset>
        <fieldset>
          <label htmlFor="">Password</label>
          <input name="password" type="text" />
        </fieldset>
        <fieldset>
          <label htmlFor="">Salary</label>
          <input name="salary" type="text" />
        </fieldset>
      </form>
    </section>
  );
};

export default Trainers;
