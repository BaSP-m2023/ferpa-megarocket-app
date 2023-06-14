import { Link, useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Input } from '../../Shared/Inputs';
import { sendTrainer, putTrainer } from '../../../redux/trainers/thunks';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';
import styles from './form.module.css';

const TrainerAddForm = () => {
  const [successAddModal, setSuccessAddModal] = useState(false);
  const [successEditModal, setSuccessEditModal] = useState(false);
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    password: '',
    salary: ''
  });
  const { id } = useParams();
  const { trainers } = useSelector((state) => state.trainers);
  const dispatch = useDispatch();
  const history = useHistory();
  // const onRedirect = {
  //   pathname: '/trainers',
  //   state: { message: '' }
  // };
  useEffect(() => {
    if (id) {
      const trainer = trainers.find((trainer) => trainer._id === id);
      setInputs(trainer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (successAddModal) {
      setTimeout(() => {
        history.push('/trainers');
        setSuccessAddModal(!successAddModal);
      }, 2000);
    }
    if (successEditModal) {
      setTimeout(() => {
        history.push('/trainers');
        setSuccessEditModal(!successEditModal);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successAddModal, successEditModal]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmitAdd = (e) => {
    e.preventDefault();
    setSuccessAddModal(!successAddModal);
    sendTrainer(dispatch, inputs);
  };
  const onSubmitEdit = (e) => {
    e.preventDefault();
    setSuccessEditModal(!successEditModal);
    putTrainer(dispatch, id, inputs);
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
