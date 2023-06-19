import { Link, useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Input } from '../../Shared/Inputs';
import { sendTrainer, putTrainer } from '../../../redux/trainers/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import React from 'react';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';
import styles from './form.module.css';

const TrainerAddForm = () => {
  const [errorModal, setErrorModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const { id } = useParams();
  const { trainers, success, error, formError } = useSelector((state) => state.trainers);
  const dispatch = useDispatch();
  const history = useHistory();
  const RGXPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const RGXEmail = /^[^@]+@[^@]+.[a-zA-Z]{2,}$/;

  const schema = Joi.object({
    firstName: Joi.string().required().min(3).max(16),
    lastName: Joi.string().required().min(3).max(16),
    dni: Joi.number().min(1000000).max(99999999).required(),
    phone: Joi.number().required().min(1000000000).max(9999999999),
    email: Joi.string().required().regex(RGXEmail).messages({
      'string.pattern.base': 'Email must be in a valid format'
    }),
    city: Joi.string().required().min(3).max(20),
    password: Joi.string().regex(RGXPassword).min(8).required().messages({
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
    }),
    salary: Joi.number().required().min(10).max(9999999999)
  });

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

  const {
    register,
    handleSubmit,
    reset,
    onChange,
    formState: { errors }
  } = useForm({ mode: 'onChange', resolver: joiResolver(schema), defaultValues: { inputs } });

  useEffect(() => {
    if (id) {
      const trainer = trainers.find((trainer) => trainer._id === id);
      const copyTrainer = { ...trainer };
      delete copyTrainer.isActive;
      delete copyTrainer.__v;
      delete copyTrainer._id;
      setInputs(copyTrainer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (success) {
      handleModalSuccess();
    }
    if (formError) {
      handleModalError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, formError]);

  useEffect(() => {
    reset(inputs);
  }, [inputs, reset]);

  const handleModalError = () => {
    setTimeout(() => {
      setErrorModal(!errorModal);
    }, 2000);
  };

  const handleModalSuccess = () => {
    setTimeout(() => {
      history.push('/trainers');
      setSuccessModal(!successModal);
    }, 2000);
  };

  const onSubmit = (data) => {
    if (id) {
      setSuccessModal(!successModal);
      putTrainer(dispatch, id, data);
    } else {
      setSuccessModal(!successModal);
      sendTrainer(dispatch, data);
    }
  };
  return (
    <div className={styles.formContainer}>
      <div className={styles.fromBackground}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.field}>
            <Input
              register={register}
              onChangeInput={onChange}
              labelText={'Name'}
              nameValue={'firstName'}
              placeholder={'First Name'}
              error={errors.firstName?.message}
            />
            <Input
              register={register}
              onChangeInput={onChange}
              labelText={'LastName'}
              nameValue={'lastName'}
              placeholder={'Last Name'}
              error={errors.lastName?.message}
            />
            <Input
              register={register}
              onChangeInput={onChange}
              labelText={'DNI'}
              nameValue={'dni'}
              placeholder={'DNI'}
              error={errors.dni?.message}
            />
            <Input
              register={register}
              onChangeInput={onChange}
              labelText={'Phone'}
              nameValue={'phone'}
              placeholder={'Phone'}
              error={errors.phone?.message}
            />
            <Input
              register={register}
              onChangeInput={onChange}
              labelText={'Email'}
              nameValue={'email'}
              placeholder={'Email'}
              error={errors.email?.message}
            />
            <Input
              register={register}
              onChangeInput={onChange}
              labelText={'City'}
              nameValue={'city'}
              placeholder={'City'}
              error={errors.city?.message}
            />
            <Input
              register={register}
              onChangeInput={onChange}
              labelText={'Salary'}
              nameValue={'salary'}
              placeholder={'Salary'}
              error={errors.salary?.message}
            />
            <Input
              register={register}
              onChangeInput={onChange}
              labelText={'Password'}
              nameValue={'password'}
              placeholder={'Password'}
              error={errors.password?.message}
            />
          </div>
          <div className={styles.buttons}>
            <Link to={'/trainers'}>
              <Button text={'Cancel'} variant={'white'} />
            </Link>
            <Button text={id ? 'Edit' : 'Add'} variant={'add'} submitting />
          </div>
          <Modal
            error
            isOpen={errorModal}
            onClose={() => setErrorModal(!errorModal)}
            title={error}
          ></Modal>
          <Modal
            success
            isOpen={successModal}
            onClose={() => setSuccessModal(!successModal)}
            title={error}
          ></Modal>
        </form>
      </div>
    </div>
  );
};

export default TrainerAddForm;
