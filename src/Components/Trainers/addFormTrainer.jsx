import React from 'react';
import Button from '../Shared/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const TrainerAddForm = () => {
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
        console.log(data);
      } else {
        throw message;
      }
    } catch (error) {
      console.error(error);
    }
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
  return (
    <form onSubmit={onSubmitAdd}>
      <div>
        <fieldset>
          <label>Name</label>
          <input name="firstName" type="text" onChange={onChangeInput} value={trainer.firstName} />
        </fieldset>
        <fieldset>
          <label>Last Name</label>
          <input name="lastName" type="text" onChange={onChangeInput} value={trainer.lastName} />
        </fieldset>
        <fieldset>
          <label>Dni</label>
          <input name="dni" type="text" onChange={onChangeInput} value={trainer.dni} />
        </fieldset>
        <fieldset>
          <label>Phone</label>
          <input name="phone" type="text" onChange={onChangeInput} value={trainer.phone} />
        </fieldset>
        <fieldset>
          <label>Email</label>
          <input name="email" type="text" onChange={onChangeInput} value={trainer.email} />
        </fieldset>
        <fieldset>
          <label>City</label>
          <input name="city" type="text" onChange={onChangeInput} value={trainer.city} />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <input name="password" type="text" onChange={onChangeInput} value={trainer.password} />
        </fieldset>
        <fieldset>
          <label>Salary</label>
          <input name="salary" type="text" onChange={onChangeInput} value={trainer.salary} />
        </fieldset>
      </div>
      <Link to={'/trainers'}>
        <Button text={'Cancel'} type={'white'} />
      </Link>
      <button type="submit">Add</button>
    </form>
  );
};

export default TrainerAddForm;
