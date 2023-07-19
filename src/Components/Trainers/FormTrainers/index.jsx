import { Link, useParams, useHistory, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Input } from 'Components/Shared/Inputs';
import { sendTrainer, putTrainer, getTrainers } from 'redux/trainers/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, useController } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { getActivities } from 'redux/activities/thunks';
import Select from 'react-select';
import Joi from 'joi';
import React from 'react';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import styles from './form.module.css';

const TrainerAddForm = () => {
  const [errorModal, setErrorModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const { id } = useParams();
  const { trainers, success, error, formError } = useSelector((state) => state.trainers);
  const { data } = useSelector((state) => state.activities);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const RGXEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  const trainer = trainers.find((trainer) => trainer._id === id);

  const createSchema = Joi.object({
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
    dni: Joi.string()
      .pattern(/^[0-9]+$/)
      .min(7)
      .max(8)
      .messages({
        'string.pattern.base': 'DNI must contain only numbers'
      }),
    phone: Joi.string()
      .pattern(/^[0-9]+$/)
      .min(10)
      .max(10)
      .messages({
        'string.pattern.base': 'Phone number must contain only numbers'
      }),
    email: Joi.string().required().regex(RGXEmail).messages({
      'string.pattern.base': 'Invalid email format'
    }),
    city: Joi.string().min(2).max(30),
    password: Joi.string()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/)
      .messages({
        'string.pattern.base': 'At least 1 uppercase, 1 lowercase, 1 number, 7 characters.'
      }),
    salary: Joi.number().min(10000),
    activities: Joi.array().items(
      Joi.string().required().min(1).messages({
        'string.min.base': 'Trainers must be assigned to at least one activity'
      })
    )
  });

  const editSchema = Joi.object({
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
    dni: Joi.string()
      .pattern(/^[0-9]+$/)
      .min(7)
      .max(8)
      .messages({
        'string.pattern.base': 'DNI must contain only numbers'
      }),
    phone: Joi.string()
      .pattern(/^[0-9]+$/)
      .min(10)
      .max(10)
      .messages({
        'string.pattern.base': 'Phone number must contain only numbers'
      }),
    email: Joi.string().required().regex(RGXEmail).messages({
      'string.pattern.base': 'Invalid email format'
    }),
    city: Joi.string().min(2).max(30),
    salary: Joi.number().min(10000),
    activities: Joi.array()
  });

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    salary: '',
    activities: []
  });

  const {
    register,
    handleSubmit,
    reset,
    onChange,
    control,
    formState: { errors, dirtyFields }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(id ? editSchema : createSchema),
    defaultValues: { inputs },
    ...(id ? { control: false } : {})
  });

  const isFormEdited = Object.keys(dirtyFields).length > 0;

  const selectError = errors.activities?.message;

  useEffect(() => {
    getTrainers(dispatch);
    getActivities(dispatch);
    if (id) {
      const singleTrainer = trainers.find((trainer) => trainer._id === id);
      const copyTrainer = { ...singleTrainer };
      delete copyTrainer.isActive;
      delete copyTrainer.__v;
      delete copyTrainer._id;
      if (id) {
        delete copyTrainer.firebaseUid;
        delete copyTrainer.password;
      }
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

  const onSubmit = (data) => {
    if (!isFormEdited) {
      history.goBack();
      return;
    }
    if (id) {
      setSuccessModal(!successModal);
      putTrainer(dispatch, id, data);
    } else {
      setSuccessModal(!successModal);
      sendTrainer(dispatch, data);
    }
  };

  const transformedData = data.map((item) => ({
    value: item._id,
    label: item.name
  }));

  const {
    field: { value: activity, onChange: onActivityChange }
  } = useController({ name: 'activities', control });

  const cancelButtonDestination = location.pathname.startsWith('/admin/trainers')
    ? '/admin/trainers'
    : location.pathname.startsWith('/trainer/form')
    ? '/trainer/profile'
    : null;

  const handleModalSuccess = () => {
    setTimeout(() => {
      history.push(cancelButtonDestination);
      setSuccessModal(!successModal);
    }, 2000);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.fromBackground}>
        {location.pathname.includes('trainer/form') ? (
          <h2 className={styles.title}>Edit Profile</h2>
        ) : (
          <h2 className={styles.title}>{id ? 'Edit Trainer' : 'Add Trainer'}</h2>
        )}
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          data-testid={'trainer-form-container'}
        >
          <div className={styles.field}>
            <div className={styles.row}>
              <div className={styles.column}>
                <div>
                  <Input
                    register={register}
                    onChangeInput={onChange}
                    labelText={'Name'}
                    nameValue={'firstName'}
                    placeholder={'First Name'}
                    error={errors.firstName?.message}
                  />
                </div>
                <div>
                  <Input
                    register={register}
                    onChangeInput={onChange}
                    labelText={'LastName'}
                    nameValue={'lastName'}
                    placeholder={'Last Name'}
                    error={errors.lastName?.message}
                  />
                </div>
                <div>
                  <Input
                    register={register}
                    onChangeInput={onChange}
                    labelText={'DNI'}
                    nameValue={'dni'}
                    placeholder={'DNI'}
                    error={errors.dni?.message}
                  />
                </div>
                <div>
                  <Input
                    register={register}
                    onChangeInput={onChange}
                    labelText={'Phone'}
                    nameValue={'phone'}
                    placeholder={'Phone'}
                    error={errors.phone?.message}
                  />
                </div>
              </div>
              <div className={styles.column}>
                <div>
                  <Input
                    register={register}
                    onChangeInput={onChange}
                    labelText={'Email'}
                    nameValue={'email'}
                    placeholder={'Email'}
                    error={errors.email?.message}
                  />
                </div>
                <div>
                  <Input
                    register={register}
                    onChangeInput={onChange}
                    labelText={'City'}
                    nameValue={'city'}
                    placeholder={'City'}
                    error={errors.city?.message}
                  />
                </div>
                <div>
                  <Input
                    register={register}
                    onChangeInput={onChange}
                    labelText={'Salary'}
                    nameValue={'salary'}
                    placeholder={'Salary'}
                    error={errors.salary?.message}
                  />
                </div>
                {!id && (
                  <div>
                    <Input
                      register={register}
                      type={'password'}
                      onChangeInput={onChange}
                      labelText={'Password'}
                      nameValue={'password'}
                      placeholder={'Password'}
                      error={errors.password?.message}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className={`${styles.select} ${styles.wideSelect}`}>
              <label className={styles.label}>Activities</label>
              <Select
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: '30px',
                    height: '50px'
                  })
                }}
                defaultValue={
                  trainer
                    ? trainer.activities.map((activity) => ({
                        value: activity._id,
                        label: activity.name
                      }))
                    : trainer
                }
                value={
                  activity
                    ? transformedData.find((singleActivity) => singleActivity.value === activity)
                    : activity
                }
                isMulti
                options={transformedData}
                onChange={(event) => {
                  onActivityChange(event.map((activity) => activity.value));
                }}
              />
              <p className={selectError ? `${styles.error}` : `${styles.error} ${styles.hidden}`}>
                <img src="../../../assets/images/warning.svg" alt="warning" />
                {selectError}
              </p>
            </div>
          </div>
          <div className={styles.buttons}>
            <Link to={cancelButtonDestination}>
              <Button text={'Cancel'} variant={'white'} testid={'cancel-btn'} />
            </Link>
            <Button text={id ? 'Edit' : 'Add'} variant={'add'} submitting testid={'add-edit-btn'} />
          </div>
          <Modal
            success
            isOpen={successModal}
            onClose={() => setSuccessModal(!successModal)}
            title={error}
            data-testid={'succes-modal'}
          ></Modal>
        </form>
      </div>
    </div>
  );
};

export default TrainerAddForm;
