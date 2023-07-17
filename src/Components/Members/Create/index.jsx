import React from 'react';
import styles from './addMembers.module.css';
import { Input, Select, DatePicker } from 'Components/Shared/Inputs';
import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createMember } from 'redux/members/thunks';
import { signUpMember } from 'redux/auth/thunks';
import { resetError } from 'redux/auth/action';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const MembersCreate = () => {
  const location = useLocation();
  const {
    error: signupError,
    message: signupMessage,
    success: signupSuccess
  } = useSelector((state) => state.auth);

  const schema = Joi.object({
    firstName: Joi.string()
      .regex(/^[A-Za-z]+$/)
      .min(3)
      .max(15)
      .messages({
        'string.pattern.base': 'First name must contain only letters'
      }),
    lastName: Joi.string()
      .regex(/^[A-Za-z]+$/)
      .min(3)
      .max(15)
      .messages({
        'string.pattern.base': 'Last name must contain only letters'
      }),
    dni: Joi.string()
      .regex(/^[0-9]+$/)
      .min(7)
      .max(8)
      .messages({
        'string.pattern.base': 'DNI must contain only numbers'
      }),
    phone: Joi.string()
      .regex(/^[0-9]+$/)
      .min(10)
      .max(10)
      .messages({
        'string.pattern.base': 'Phone number must contain only numbers'
      }),
    email: Joi.string()
      .max(30)
      .pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
      .messages({
        'string.pattern.base': 'Invalid email format'
      }),
    city: Joi.string().min(2).max(30),
    birthDay: Joi.date().min('1930-01-01').max('2008-01-01').messages({
      'date.min': 'Birth day must be greater than "01/01/1930"',
      'date.max': 'Birth day must be less than "01/01/2008"'
    }),
    postalCode: Joi.string()
      .regex(/^[^\s]+$/)
      .min(4)
      .max(6)
      .messages({
        'string.pattern.base': 'Zip must not contain empty spaces'
      }),
    isActive: Joi.boolean(),
    membership: Joi.string().valid('Classic', 'Only Classes', 'Black').required(),
    password: Joi.string()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/)
      .messages({
        'string.pattern.base': 'Password too weak. Example: pAssword1'
      })
  });

  const memberships = [
    {
      _id: 1,
      name: 'Classic',
      value: 'Classic'
    },
    {
      _id: 2,
      name: 'Only Classes',
      value: 'Only Classes'
    },
    {
      _id: 3,
      name: 'Black Membership',
      value: 'Black'
    }
  ];

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  const history = useHistory();
  const { error, success, message } = useSelector((state) => state.members);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: { isActive: false }
  });

  useEffect(() => {
    dispatch(resetError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (success && location.pathname.includes('/admin/members/form')) {
      setTimeout(() => {
        history.push('/admin/members');
      }, 2000);
      setShowModal(true);
    }

    if (error) {
      setShowModalError(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, error]);

  useEffect(() => {
    if (signupSuccess) {
      setTimeout(() => {
        history.push('/home/login');
      }, 2000);
      setSignupModal(!signupModal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signupSuccess]);

  const onSubmit = (data) => {
    if (location.pathname.includes('/home/signup')) {
      dispatch(signUpMember(data));
    } else {
      dispatch(createMember(data));
    }
  };

  if (location.pathname.includes('/home/signup')) {
    return (
      <section className={styles.signupContainer}>
        <Modal
          onClose={() => setSignupModal(!signupModal)}
          isOpen={signupModal}
          title={'Successfully created'}
          success
          testid={'success-modal'}
        />
        <div className={styles.signup}>
          <div className={styles.box} data-testid={'signup-container'}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.form}
              data-testid={'signup-form'}
            >
              <h2 className={styles.formTitle}>SIGN UP</h2>
              <div className={styles.columns}>
                <div className={styles.column}>
                  <div className={styles.inputBox}>
                    <Input
                      labelText={'First Name'}
                      type={'text'}
                      placeholder={'First Name'}
                      nameValue={'firstName'}
                      register={register}
                      error={errors.firstName?.message}
                    />
                  </div>
                  <div className={styles.inputBox}>
                    <Input
                      labelText={'Last Name'}
                      type={'text'}
                      placeholder={'Last Name'}
                      nameValue={'lastName'}
                      register={register}
                      error={errors.lastName?.message}
                    />
                  </div>
                  <div className={styles.inputBox}>
                    <Input
                      labelText={'DNI'}
                      type={'text'}
                      placeholder={'DNI'}
                      nameValue={'dni'}
                      register={register}
                      error={errors.dni?.message}
                    />
                  </div>
                  <div className={styles.inputBox}>
                    <Input
                      labelText={'Phone'}
                      type={'text'}
                      placeholder={'Phone Number'}
                      nameValue={'phone'}
                      register={register}
                      error={errors.phone?.message}
                    />
                  </div>
                  <div className={styles.inputBox}>
                    <Input
                      labelText={'Email'}
                      type={'text'}
                      placeholder={'example@example.com'}
                      nameValue={'email'}
                      register={register}
                      error={errors.email?.message}
                    />
                  </div>
                </div>
                <div className={styles.column}>
                  <div className={styles.inputBox}>
                    <Input
                      labelText={'City'}
                      type={'text'}
                      placeholder={'Your city'}
                      nameValue={'city'}
                      register={register}
                      error={errors.city?.message}
                    />
                  </div>
                  <div className={styles.inputBox}>
                    <DatePicker
                      label={'Birthday'}
                      nameValue={'birthDay'}
                      register={register}
                      error={errors.birthDay?.message}
                    />
                  </div>
                  <div className={styles.inputBox}>
                    <Input
                      labelText={'Zip Code'}
                      type={'text'}
                      placeholder={'Your postal code'}
                      nameValue={'postalCode'}
                      register={register}
                      error={errors.postalCode?.message}
                    />
                  </div>
                  <div className={styles.inputBox}>
                    <Select
                      label={'Membership'}
                      placeholder={'Classic'}
                      options={memberships}
                      nameValue={'membership'}
                      register={register}
                      error={errors.membership?.message}
                    />
                  </div>
                  <div className={styles.inputBox}>
                    <Input
                      register={register}
                      type={'password'}
                      labelText={'Password'}
                      placeholder={'Password'}
                      nameValue={'password'}
                      error={errors.password?.message}
                    />
                  </div>
                </div>
              </div>
              <p
                className={
                  !signupError ? `${styles.error} ${styles.errorHidden}` : `${styles.error}`
                }
              >
                <img src="../../../assets/images/warning.svg" alt="warning" /> {signupMessage}
              </p>
              <div className={styles.signupButton}>
                <Button text={'Sign Up'} variant={'add'} submitting testid={'add-btn'} />
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className={styles.container}>
      <Modal
        onClose={() => setShowModalError(false)}
        isOpen={showModalError}
        title={message}
        error
        testid={'error-modal'}
      />
      <Modal
        onClose={() => setShowModal(false)}
        isOpen={showModal}
        title={message}
        success
        testid={'success-modal'}
      />
      <div className={styles.inAdminBox}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          data-testid={'member-add-form'}
        >
          <h2 className={styles.formTitle}>ADD MEMBER</h2>
          <div className={styles.row}>
            <div className={styles.column}>
              <div className={styles.inputBox}>
                <Input
                  labelText={'First Name'}
                  type={'text'}
                  placeholder={'First Name'}
                  nameValue={'firstName'}
                  register={register}
                  error={errors.firstName?.message}
                />
              </div>
              <div className={styles.inputBox}>
                <Input
                  labelText={'Last Name'}
                  type={'text'}
                  placeholder={'Last Name'}
                  nameValue={'lastName'}
                  register={register}
                  error={errors.lastName?.message}
                />
              </div>
              <div className={styles.inputBox}>
                <Input
                  labelText={'DNI'}
                  type={'text'}
                  placeholder={'DNI'}
                  nameValue={'dni'}
                  register={register}
                  error={errors.dni?.message}
                />
              </div>
              <div className={styles.inputBox}>
                <Input
                  labelText={'Phone'}
                  type={'text'}
                  placeholder={'ex: 096513178'}
                  nameValue={'phone'}
                  register={register}
                  error={errors.phone?.message}
                />
              </div>
              <div className={styles.inputBox}>
                <Input
                  labelText={'Email'}
                  type={'text'}
                  placeholder={'robertomariaoverdrive@soybostero.edu'}
                  nameValue={'email'}
                  register={register}
                  error={errors.email?.message}
                />
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.inputBox}>
                <Input
                  labelText={'City'}
                  type={'text'}
                  placeholder={'Your city'}
                  nameValue={'city'}
                  register={register}
                  error={errors.city?.message}
                />
              </div>
              <div className={styles.inputBox}>
                <DatePicker
                  label={'Birthday'}
                  nameValue={'birthDay'}
                  register={register}
                  error={errors.birthDay?.message}
                />
              </div>
              <div className={styles.inputBox}>
                <Input
                  labelText={'Zip Code'}
                  type={'text'}
                  placeholder={'Your postal code'}
                  nameValue={'postalCode'}
                  register={register}
                  error={errors.postalCode?.message}
                />
              </div>
              <div className={styles.inputBox}>
                <Select
                  label={'Membership'}
                  placeholder={'Classic'}
                  options={memberships}
                  nameValue={'membership'}
                  register={register}
                  error={errors.membership?.message}
                />
              </div>
              <div className={styles.checkboxField}>
                <label>Inactive / Active</label>
                <label className={styles.switch}>
                  <input
                    className={styles.checkbox}
                    name={'isActive'}
                    type="checkbox"
                    {...register('isActive')}
                  />
                  <span className={`${styles.slider} ${styles.round}`}></span>
                </label>
              </div>
            </div>
          </div>
          <div className={styles.formBtns}>
            <Link to="/admin/members">
              <Button text={'Cancel'} variant={'white'} testid={'cancel-btn'} />
            </Link>
            <Button text={'Add'} variant={'add'} submitting testid={'confirm-add-btn'} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MembersCreate;
