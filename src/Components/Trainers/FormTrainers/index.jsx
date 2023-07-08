import { Link, useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Input } from 'Components/Shared/Inputs';
import { sendTrainer, putTrainer } from 'redux/trainers/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { getActivities } from 'redux/activities/thunks';
import Select from 'react-select';
// import AsyncSelect from 'react-select';
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
  const RGXPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const RGXEmail = /^[^@]+@[^@]+.[a-zA-Z]{2,}$/;
  const [selectedOptions, setSelectedOptions] = useState([]);

  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(15)
      .pattern(/^[a-zA-Z-]+$/),
    lastName: Joi.string()
      .min(3)
      .max(15)
      .pattern(/^[a-zA-Z-]+$/),
    dni: Joi.number().min(1000000).max(99999999),
    phone: Joi.number().min(1000000000).max(9999999999),
    email: Joi.string().required().regex(RGXEmail).messages({
      'string.pattern.base': 'Email must be in a valid format'
    }),
    city: Joi.string().min(2).max(30),
    password: Joi.string().regex(RGXPassword).min(8).required().messages({
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, and be at least 8 characters long'
    }),
    salary: Joi.number().min(10000),
    activities: Joi.array().items(Joi.object().keys({ activityId: Joi.string().required() }))
  });

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    password: '',
    salary: '',
    activities: [{ activityId: '' }]
  });

  const {
    register,
    handleSubmit,
    reset,
    onChange,
    formState: { errors, dirtyFields }
  } = useForm({ mode: 'onChange', resolver: joiResolver(schema), defaultValues: { inputs } });

  const isFormEdited = Object.keys(dirtyFields).length > 0;

  useEffect(() => {
    getActivities(dispatch);
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
      history.push('/admin/trainers');
      setSuccessModal(!successModal);
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

  const sendMulty = (selectedOptions) => {
    const transformedSelected = selectedOptions.map((option) => ({ activityId: option.value }));
    setSelectedOptions(selectedOptions);
    const sendArray = [];
    sendArray.push(transformedSelected);
    console.log(sendArray);
  };
  // const {
  //   field: { value: activity, onChange: sendMulty }
  // } = useController({ name: 'trainers', control });

  return (
    <div className={styles.formContainer}>
      <div className={styles.fromBackground}>
        <h2 className={styles.title}>{id ? 'Edit Trainer' : 'Add Trainer'}</h2>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          data-testid={'trainer-form-container'}
        >
          <div className={styles.field}>
            <div className={styles.row}>
              <div className={styles.column}>
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
              </div>
              <div className={styles.column}>
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
            </div>
            <Select
              options={transformedData}
              isMulti
              onChange={(e) => {
                sendMulty(e);
              }}
              name={'activities'}
              value={selectedOptions}
            />
          </div>
          <div className={styles.buttons}>
            <Link to={'/admin/trainers'}>
              <Button text={'Cancel'} variant={'white'} />
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
