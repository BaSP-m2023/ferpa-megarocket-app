import React from 'react';
import Button from '../../Shared/Button';
import { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Input } from '../../Shared/Inputs';
import Modal from '../../Shared/Modal';
import styles from './form.module.css';

const TrainerAddForm = () => {
  const [successAddModal, setSuccessAddModal] = useState(false);
  const [successEditModal, setSuccessEditModal] = useState(false);
  const [inputs, setInputs] = useState({});
  const { id } = useParams();
  const history = useHistory();
  const onRedirect = {
    pathname: '/trainers',
    state: { message: '' }
  };
  useEffect(() => {
    if (id) {
      getTrainerID(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getTrainerID = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/${id}`);
      const { data } = await res.json();
      if (data) {
        setInputs(data);
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const putTrainer = async (id, item) => {
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
      if (!error) {
        console.log(message);
      } else {
        throw message;
      }
      setTimeout(() => {
        onRedirect.state.message = data.message;
        history.push(onRedirect);
      }, 1500);
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
      const { data } = await response.json();
      setTimeout(() => {
        onRedirect.state.message = data.message;
        history.push(onRedirect);
      }, 1500);
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
    setSuccessAddModal(!successAddModal);
    sendTrainer(inputs);
  };
  const onSubmitEdit = (e) => {
    e.preventDefault();
    setSuccessEditModal(!successEditModal);
    putTrainer(id, inputs);
  };
  return (
    <div className={styles.formContainer}>
      <div className={styles.fromBackground}>
        <form className={styles.form} onSubmit={id ? onSubmitEdit : onSubmitAdd}>
          <div className={styles.field}>
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
          <div className={styles.buttons}>
            <Link to={'/trainers'}>
              <Button text={'Cancel'} variant={'white'} />
            </Link>
            <Button text={id ? 'Edit' : 'Add'} variant={'add'} submitting />
          </div>
          <Modal
            success
            isOpen={successAddModal}
            onClose={() => setSuccessAddModal(!successAddModal)}
            title={'Trainer Added successfully'}
          ></Modal>
          <Modal
            success
            isOpen={successEditModal}
            onClose={() => setSuccessEditModal(!successEditModal)}
            title={'Trainer Edited successfully'}
          ></Modal>
        </form>
      </div>
    </div>
  );
};

export default TrainerAddForm;