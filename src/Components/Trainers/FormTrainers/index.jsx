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
  // const [focusPass, setFocusPass] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const { id } = useParams();
  const { trainers, success, error, formError, message } = useSelector((state) => state.trainers);
  const dispatch = useDispatch();
  const history = useHistory();

  const schema = Joi.object({
    firstName: Joi.string().required().min(3).max(16),
    lastName: Joi.string().required().min(3).max(16),
    // dni: Joi.string().required().pattern(new RegExp('^[0-9]+$')).min(7).max(10),
    // phone: Joi.string().required().pattern(new RegExp('^[0-9]+$')).min(7).max(15),
    email: Joi.string().required().pattern(new RegExp('^\\S+@\\S+\\.\\S+$')),
    city: Joi.string().required().min(3).max(20),
    password: Joi.string()
      .required()
      .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'))
    // salary: Joi.string().required().min(0)
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
    formState: { errors }
  } = useForm({ mode: 'onChange', resolver: joiResolver(schema), defaultValues: { inputs } });

  useEffect(() => {
    if (id) {
      const trainer = trainers.find((trainer) => trainer._id === id);
      setInputs(trainer);
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
      setSuccessModal(!successModal);
    }, 2000);
  };

  const handleModalSuccess = () => {
    setTimeout(() => {
      history.push('/trainers');
      setErrorModal(!errorModal);
    }, 2000);
  };

  const onSubmitAdd = (data) => {
    setErrorModal(!errorModal);
    sendTrainer(dispatch, data);
  };
  const onSubmitEdit = (e) => {
    setSuccessModal(!successModal);
    putTrainer(dispatch, id, inputs);
  };
  return (
    <div className={styles.formContainer}>
      <div className={styles.fromBackground}>
        <form className={styles.form} onSubmit={handleSubmit(id ? onSubmitEdit : onSubmitAdd)}>
          <div className={styles.field}>
            <Input
              register={register}
              labelText={'Name'}
              nameValue={'firstName'}
              placeholder={'First Name'}
              error={errors.firstName?.message}
              // value={inputs.firstName}
            />
            <Input
              register={register}
              labelText={'LastName'}
              nameValue={'lastName'}
              placeholder={'Last Name'}
              error={errors.lastName?.message}
              // value={inputs.lastName}
            />
            <Input
              register={register}
              labelText={'DNI'}
              nameValue={'dni'}
              placeholder={'DNI'}
              error={errors.dni?.message}
              // value={inputs.dni}
            />
            <Input
              register={register}
              labelText={'Phone'}
              nameValue={'phone'}
              placeholder={'Phone'}
              error={errors.phone?.message}
              // value={inputs.phone}
            />
            <Input
              register={register}
              labelText={'Email'}
              nameValue={'email'}
              placeholder={'Email'}
              error={errors.email?.message}
              // value={inputs.email}
            />
            <Input
              register={register}
              labelText={'City'}
              nameValue={'city'}
              placeholder={'City'}
              error={errors.city?.message}
              // value={inputs.city}
            />
            <Input
              register={register}
              labelText={'Salary'}
              nameValue={'salary'}
              placeholder={'Salary'}
              error={errors.salary?.message}
              // value={inputs.salary}
            />
            <Input
              register={register}
              labelText={'Password'}
              nameValue={'password'}
              type={'password'}
              placeholder={'Password'}
              // onFocus={() => setFocusPass(true)}
              // onBlur={() => setFocusPass(false)}
              error={errors.password?.message}
              // value={inputs.password}
            />
            {/* {focusPass && (
              <p className={styles.passwordAlert}>
                * The password must have uppercase letters, lowercase letters, number and at least 8
                characters
              </p> */}
            {/* )} */}
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
            title={message}
          ></Modal>
        </form>
      </div>
    </div>
  );
};

export default TrainerAddForm;
