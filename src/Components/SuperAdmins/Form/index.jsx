import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { Input } from '../../Shared/Inputs';
import { useDispatch, useSelector } from 'react-redux';
import { postSuperAdmins, putSuperAdmin } from '../../../redux/superadmins/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import styles from './form.module.css';
import Modal from '../../Shared/Modal';
import Button from '../../Shared/Button';

const Form = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, message, success, error } = useSelector((state) => state.superadmins);
  // const [email, setEmail] = useState('');
  // const [pass, setPass] = useState('');
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
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
    })
  });

  const {
    register,
    // reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });

  const onSubmit = (data) => {
    console.log('Data Form', data);
  };

  useEffect(() => {
    if (location.pathname.includes('edit')) {
      const superadmin = data.find((superadmin) => superadmin._id === id);
      setEmail(superadmin.email);
      setPass(superadmin.password);
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

  // const sendSuperAdmin = () => {
  //   if (location.pathname.includes('create')) {
  //     postSuperAdmins(dispatch, { email, password: pass });
  //   }

  //   if (location.pathname.includes('edit')) {
  //     putSuperAdmin(dispatch, id, { email, password: pass });
  //   }
  // };

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
              placeholder={'Email:'}
              error={errors.email?.message}
              // value={email}
              onChangeInput={(e) => {
                setEmail(e.target.value);
              }}
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
              // value={pass}
              onChangeInput={(e) => setPass(e.target.value)}
            />
          </div>
          <p className={styles.comment}>
            {
              '* The password must have uppercase letters, lowercase letters, number and at least 8 characters'
            }
          </p>
          <div className={styles.buttons}>
            <Link to="/super-admins">
              <Button text={'Cancel'} variant={'white'} />
            </Link>
            <Button
              text={location.pathname.includes('create') ? 'Create' : 'Edit'}
              variant={'add'}
              submitting
              // clickAction={() => sendSuperAdmin()}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
