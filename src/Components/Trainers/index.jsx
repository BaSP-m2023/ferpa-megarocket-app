import { useEffect, useState } from 'react';
import styles from './trainers.module.css';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [currentId, setCurrentId] = useState('');
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

  const sendTrainer = async (item) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const { data, message, error } = await response.json();
      if (!error) {
        addTrainer(data);
        setToggleAdd(false);
      } else {
        throw message;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const putTrainer = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/${id}`, {
        method: 'PUT',
        body: JSON.stringify(trainer),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const { message, error } = await response.json();
      if (!error) {
        getTrainers();
        setToggleEdit(false);
      } else {
        throw message;
      }
    } catch (error) {
      console.error(error);
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

  const onChangeInput = (e) => {
    setTrainer({
      ...trainer,
      [e.target.name]: e.target.value
    });
  };
  const onSubmitAdd = (e) => {
    e.preventDefault();
    sendTrainer(trainer);
  };
  const showEditTrainer = (item) => {
    setTrainer({
      firstName: item.firstName,
      lastName: item.lastName,
      dni: item.dni.toString(),
      phone: item.phone.toString(),
      email: item.email,
      city: item.city,
      password: item.password,
      salary: item.salary.toString()
    });
    setToggleEdit(true);
    setToggleAdd(false);
    setCurrentId(item._id);
  };

  const editTrainer = (e) => {
    e.preventDefault();
    putTrainer(currentId);
  };

  return (
    <section className={styles.container}>
      <h2>Trainers</h2>
      <button
        className={!toggleAdd ? styles.show : styles.hide}
        id="adding"
        onClick={() => {
          setToggleAdd(true);
          setToggleEdit(false);
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
        <form onSubmit={onSubmitAdd}>
          <div>
            <fieldset>
              <label>Name</label>
              <input name="firstName" type="text" onChange={onChangeInput} />
            </fieldset>
            <fieldset>
              <label>Last Name</label>
              <input name="lastName" type="text" onChange={onChangeInput} />
            </fieldset>
            <fieldset>
              <label>Dni</label>
              <input name="dni" type="text" onChange={onChangeInput} />
            </fieldset>
            <fieldset>
              <label>Phone</label>
              <input name="phone" type="text" onChange={onChangeInput} />
            </fieldset>
            <fieldset>
              <label>Email</label>
              <input name="email" type="text" onChange={onChangeInput} />
            </fieldset>
            <fieldset>
              <label>City</label>
              <input name="city" type="text" onChange={onChangeInput} />
            </fieldset>
            <fieldset>
              <label>Password</label>
              <input name="password" type="text" onChange={onChangeInput} />
            </fieldset>
            <fieldset>
              <label>Salary</label>
              <input name="salary" type="text" onChange={onChangeInput} />
            </fieldset>
          </div>
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
                  <button onClick={() => showEditTrainer(item)}>Edit</button>
                  <button className={styles.deleteBtn} onClick={() => deleteTrainer(item._id)}>
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {toggleEdit && (
        <form onSubmit={editTrainer}>
          <div>
            <fieldset>
              <label>Name</label>
              <input
                value={trainer.firstName}
                onChange={onChangeInput}
                name="firstName"
                type="text"
              />
            </fieldset>
            <fieldset>
              <label>Last Name</label>
              <input
                value={trainer.lastName}
                onChange={onChangeInput}
                name="lastName"
                type="text"
              />
            </fieldset>
            <fieldset>
              <label>Dni</label>
              <input value={trainer.dni} onChange={onChangeInput} name="dni" type="text" />
            </fieldset>
            <fieldset>
              <label>Phone</label>
              <input value={trainer.phone} onChange={onChangeInput} name="phone" type="text" />
            </fieldset>
            <fieldset>
              <label>Email</label>
              <input value={trainer.email} onChange={onChangeInput} name="email" type="text" />
            </fieldset>
            <fieldset>
              <label>City</label>
              <input value={trainer.city} onChange={onChangeInput} name="city" type="text" />
            </fieldset>
            <fieldset>
              <label>Password</label>
              <input
                value={trainer.password}
                onChange={onChangeInput}
                name="password"
                type="text"
              />
            </fieldset>
            <fieldset>
              <label>Salary</label>
              <input value={trainer.salary} onChange={onChangeInput} name="salary" type="text" />
            </fieldset>
          </div>
          <button type="submit">Edit</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setToggleEdit(false);
            }}
          >
            Cancel
          </button>
        </form>
      )}
    </section>
  );
};

export default Trainers;