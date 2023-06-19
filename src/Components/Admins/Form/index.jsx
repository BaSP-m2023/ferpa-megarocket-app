import { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Input } from 'Components/Shared/Inputs';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins, updateAdmin, addAdmin } from 'redux/admins/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import styles from './adminsForm.module.css';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import * as actionsConstants from 'redux/admins/actions';

const Form = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isPending, data, error, errorSwitch, message } = useSelector((state) => state.admins);
  const [inputs, setInputs] = useState({});
  const [successModal, setSuccesModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const RGXPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const RGXEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(15),
    lastName: Joi.string().min(3).max(15),
    dni: Joi.string().length(9),
    phone: Joi.string().length(10),
    email: Joi.string().regex(RGXEmail).required().messages({
      'string.pattern.base': 'Email must be in a valid format'
    }),
    city: Joi.string(),
    password: Joi.string().regex(RGXPassword).min(8).required().messages({
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
    })
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: inputs
  });

  useEffect(() => {
    reset(inputs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs, reset]);

  useEffect(() => {
    getAdmins(dispatch);
    if (id) {
      setInputs(data.find((admin) => admin._id === id));
    } else {
      setInputs({});
    }
    return () => {
      putPending();
      dispatch(actionsConstants.addAdminsPending());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.length === 0]);

  useEffect(() => {
    if (message && !errorSwitch && !isPending) {
      setSuccesModal(true);
      setTimeout(() => {
        setSuccesModal(false);
        redirectPath();
        putPending();
      }, 2000);
      putPending();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    if (errorSwitch) {
      setErrorModal(true);
      setInputs(inputs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorSwitch, error]);

  const putPending = () => {
    dispatch(actionsConstants.putAdminsPending());
  };

  const addPending = () => {
    dispatch(actionsConstants.addAdminsPending());
  };

  const handleSubmiting = (data) => {
    addAdmin(dispatch, data);
  };

  const handleUpdate = (data) => {
    updateAdmin(dispatch, id, data);
  };

  const redirectPath = () => {
    const path = { pathname: '/admins' };
    history.push(path);
  };

  return (
    <div className={styles.container}>
      <Modal
        text={id ? 'Admin Successfully Updated' : 'Admin Successfully Created'}
        isOpen={successModal}
        onClose={() => {
          setSuccesModal(!successModal);
          redirectPath();
        }}
      />
      <Modal
        title={'ERROR'}
        text={error}
        isOpen={errorModal}
        onClose={() => {
          setErrorModal(!errorModal);
          putPending();
          addPending();
        }}
        warning
      >
        <Button
          text={'Close'}
          variant={'delete'}
          clickAction={() => {
            setErrorModal(!errorModal);
            putPending();
            addPending();
          }}
        />
      </Modal>
      <form
        className={`${styles.form} ${styles.list}`}
        onSubmit={handleSubmit(id ? handleUpdate : handleSubmiting)}
      >
        <h2 className={styles.title}>{id ? 'Edit Admin' : 'Add Admin'}</h2>
        <div className={styles.inputGroup}>
          <Input
            register={register}
            labelText={'First Name'}
            placeholder={'First Name'}
            nameValue={'firstName'}
            error={errors.firstName?.message}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            register={register}
            labelText={'Last Name'}
            placeholder={'Last Name'}
            nameValue={'lastName'}
            error={errors.lastName?.message}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            register={register}
            labelText={'DNI'}
            placeholder={'DNI Number'}
            nameValue={'dni'}
            error={errors.dni?.message}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            register={register}
            labelText={'Phone'}
            placeholder={'Phone'}
            nameValue={'phone'}
            error={errors.phone?.message}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            register={register}
            labelText={'Email'}
            placeholder={'Email'}
            nameValue={'email'}
            error={errors.email?.message}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            register={register}
            labelText={'City'}
            placeholder={'City'}
            nameValue={'city'}
            error={errors.city?.message}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            register={register}
            type={'password'}
            labelText={'Password'}
            placeholder={'Password'}
            nameValue={'password'}
            error={errors.password?.message}
          />
        </div>
        <div className={styles.modalBtns}>
          <Link to="/admins">
            <Button text={'Cancel'} variant={'white'} />
          </Link>
          {id ? (
            <Button variant={'add'} text={'Update Admin'} submitting />
          ) : (
            <Button variant={'add'} text={'Add Admin'} submitting />
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
