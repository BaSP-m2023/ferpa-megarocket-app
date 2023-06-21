import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { Input } from 'Components/Shared/Inputs';
import { useDispatch, useSelector } from 'react-redux';
import { postSuperAdmins, putSuperAdmin } from 'redux/superadmins/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import styles from './form.module.css';
import Modal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';

const Form = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, message, success, error } = useSelector((state) => state.superadmins);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const RGXPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const RGXEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  const schema = Joi.object({
    email: Joi.string().regex(RGXEmail).required().messages({
      'string.pattern.base': 'Email must be in a valid format'
    }),
    password: Joi.string().regex(RGXPassword).min(8).required().messages({
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, and be at least 8 characters long'
    })
  });

  const {
    register,
    reset,
    handleSubmit,
    onChange,
    formState: { errors, dirtyFields }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: {
      email: email,
      password: password
    }
  });

  useEffect(() => {
    reset({ email, password });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password, reset]);

  const isFormEdited = Object.keys(dirtyFields).length > 0;

  const onSubmit = (data) => {
    if (!isFormEdited) {
      history.goBack(); // Redirige a la página anterior si no hay cambios en el formulario
      return;
    }

    if (location.pathname.includes('create')) {
      postSuperAdmins(dispatch, data);
    }
    if (location.pathname.includes('edit')) {
      putSuperAdmin(dispatch, id, data);
    }
  };

  useEffect(() => {
    if (location.pathname.includes('edit')) {
      const superadmin = data.find((superadmin) => superadmin._id === id);
      setEmail(superadmin.email);
      setPassword(superadmin.password);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (success) {
      history.push('/super-admins');
    }
    if (error) {
      setShowModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, success]);

  return (
    <div className={styles.formContainer}>
      <Modal onClose={() => setShowModal(false)} isOpen={showModal} title={message} error />
      <div className={styles.formBox}>
        <h3 className={styles.title}>
          {location.pathname.includes('create') ? 'Add New Super Admin' : 'Edit Super Admin'}
        </h3>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.field}>
            <Input
              register={register}
              nameValue={'email'}
              labelText={'Email:'}
              type={'text'}
              onChange={onChange}
              placeholder={'Email:'}
              error={errors.email?.message}
            />
          </div>
          <div className={styles.field}>
            <Input
              register={register}
              nameValue={'password'}
              labelText={'Password:'}
              type={'password'}
              placeholder={'Password:'}
              error={errors.password?.message}
            />
          </div>
          <div className={styles.buttons}>
            <Link to="/super-admins">
              <Button text={'Cancel'} variant={'white'} />
            </Link>
            <Button
              text={location.pathname.includes('create') ? 'Create' : 'Edit'}
              variant={'add'}
              submitting
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
