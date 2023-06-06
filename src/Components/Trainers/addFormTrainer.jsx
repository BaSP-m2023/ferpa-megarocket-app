import React from 'react';
import Button from '../Shared/Button';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const TrainerAddForm = () => {
  const { id } = useParams();
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
  useEffect(() => {
    if (id) {
      getTrainerID(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getTrainerID = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/${id}`);
      const { data, error, message } = await res.json();
      if (data) {
        setTrainer(data);
      }
      console.log(error);
      console.log(message);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const putTrainer = async (id, item) => {
    console.log(item);
    const setEditTrainer = {
      firstName: item.firstName,
      lastName: item.lastName,
      dni: item.dni.toString(),
      phone: item.phone.toString(),
      email: item.email,
      city: item.city,
      password: item.password,
      salary: item.salary.toString()
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/${id}`, {
        method: 'PUT',
        body: JSON.stringify(setEditTrainer),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const { message, error, data } = await response.json();
      console.log(data);
      if (!error) {
        console.log(message);
      } else {
        throw message;
      }
    } catch (error) {
      console.error(error);
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
  const onSubmitEdit = (e) => {
    e.preventDefault();
    putTrainer(id, trainer);
  };
  return (
    <form onSubmit={id ? onSubmitEdit : onSubmitAdd}>
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
      <button type="submit">{id ? 'Edit' : 'Add'}</button>
    </form>
  );
};

export default TrainerAddForm;
