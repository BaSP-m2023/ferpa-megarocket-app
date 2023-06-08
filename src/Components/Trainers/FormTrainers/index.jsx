import React from 'react';
import Button from '../../Shared/Button';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Input } from '../../Shared/Inputs';
import Modal from '../../Shared/Modal';

const TrainerAddForm = () => {
  const [successAddModal, setSuccessAddModal] = useState(false);
  const [inputs, setInputs] = useState({});
  const { id } = useParams();
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
        setInputs(data);
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
    console.log(item);
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

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmitAdd = (e) => {
    e.preventDefault();
    sendTrainer(inputs);
  };
  const onSubmitEdit = (e) => {
    e.preventDefault();
    putTrainer(id, inputs);
  };
  return (
    <form onSubmit={id ? onSubmitEdit : onSubmitAdd}>
      <div>
        <Input
          labelText={'Name'}
          nameValue={'firstName'}
          placeholder={'First Name'}
          value={inputs.firstName}
          onChangeInput={handleChange}
        />
        <Input
          labelText={'LastName'}
          nameValue={'lastName'}
          placeholder={'Last Name'}
          value={inputs.lastName}
          onChangeInput={handleChange}
        />
        <Input
          labelText={'DNI'}
          nameValue={'dni'}
          placeholder={'DNI'}
          value={inputs.dni}
          onChangeInput={handleChange}
        />
        <Input
          labelText={'Phone'}
          nameValue={'phone'}
          placeholder={'Phone'}
          value={inputs.phone}
          onChangeInput={handleChange}
        />
        <Input
          labelText={'Email'}
          nameValue={'email'}
          placeholder={'Email'}
          value={inputs.email}
          onChangeInput={handleChange}
        />
        <Input
          labelText={'City'}
          nameValue={'city'}
          placeholder={'City'}
          value={inputs.city}
          onChangeInput={handleChange}
        />
        <Input
          labelText={'Password'}
          nameValue={'password'}
          type={'password'}
          placeholder={'Password'}
          value={inputs.password}
          onChangeInput={handleChange}
        />
        <Input
          labelText={'Salary'}
          nameValue={'salary'}
          placeholder={'Salary'}
          value={inputs.salary}
          onChangeInput={handleChange}
        />
      </div>
      <Link to={'/trainers'}>
        <Button text={'Cancel'} variant={'white'} />
      </Link>
      <Modal
        success
        isOpen={successAddModal}
        onClose={() => setSuccessAddModal(!successAddModal)}
        title={'Trainer Added successfully'}
      ></Modal>
      <Button text={id ? 'Edit' : 'Add'} variant={'add'} submitting />
    </form>
  );
};

export default TrainerAddForm;
