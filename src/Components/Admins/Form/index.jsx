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

  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(15)
      .pattern(/^[a-zA-Z-]+$/)
      .messages({
        'string.pattern.base': 'First name must contain only letters'
      }),
    lastName: Joi.string()
      .min(3)
      .max(15)
      .pattern(/^[a-zA-Z-]+$/)
      .messages({
        'string.pattern.base': 'Last name must contain only letters'
      }),
    dni: Joi.number().min(1000000).max(99999999).messages({
      'number.min': 'DNI must have at least 7 numbers',
      'number.max': 'DNI must have a maximum of 8 numbers'
    }),
    phone: Joi.number().min(1000000000).max(9999999999).messages({
      'number.min': 'Phone must have 10 numbers',
      'number.max': 'Phone must have 10 numbers'
    }),
    email: Joi.string()
      .pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
      .messages({
        'string.pattern.base': 'Email must be in a valid format (example@example.com)'
      }),
    city: Joi.string().min(1).max(58),
    password: Joi.string()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/)
      .messages({
        'string.pattern.base':
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 7 characters long'
      })
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, dirtyFields }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: inputs
  });

  useEffect(() => {
    reset(inputs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs, reset]);

  const isFormEdited = Object.keys(dirtyFields).length > 0;

  useEffect(() => {
    getAdmins(dispatch);
    if (id) {
      const administrator = data.find((admin) => admin._id === id);
      const copyAdmin = { ...administrator };
      delete copyAdmin._id;
      delete copyAdmin.__v;
      setInputs(copyAdmin);
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
    if (!isFormEdited) {
      history.goBack(); // Redirige a la página anterior si no hay cambios en el formulario
      return;
    } else {
      updateAdmin(dispatch, id, data);
    }
  };

  const redirectPath = () => {
    const path = { pathname: '/admins/home/profile' };
    history.push(path);
  };

  return (
    <div className={styles.container}>
      <Modal
        title={id ? 'Admin Successfully Updated' : 'Admin Successfully Created'}
        success
        isOpen={successModal}
        onClose={() => {
          setSuccesModal(!successModal);
          redirectPath();
        }}
        data-testid={'success-modal'}
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
        data-testid={'error-modal'}
      >
        <Button
          text={'Close'}
          variant={'delete'}
          clickAction={() => {
            setErrorModal(!errorModal);
            putPending();
            addPending();
          }}
          testid={'close-btn'}
        />
      </Modal>
      <form
        className={`${styles.form} ${styles.list}`}
        onSubmit={handleSubmit(id ? handleUpdate : handleSubmiting)}
        data-testid={'admin-editform'}
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
          <Link to="/admins/home/profile">
            <Button text={'Cancel'} variant={'white'} testid={'cancel-btn'} />
          </Link>
          {id ? (
            <Button variant={'add'} text={'Update Admin'} submitting testid={'confirm-edit-btn'} />
          ) : (
            <Button variant={'add'} text={'Add Admin'} submitting />
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
