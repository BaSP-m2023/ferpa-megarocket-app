import React from 'react';
import styles from './addMembers.module.css';
import { Input, Select, DatePicker } from 'Components/Shared/Inputs';
import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createMember } from 'redux/members/thunks';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import Aside from 'Components/Shared/Aside';

const MembersCreate = () => {
  const location = useLocation();

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
    isMembershipActive: Joi.boolean()
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
    if (success && location.pathname.includes('/admins/home/members/create')) {
      setTimeout(() => {
        history.push('/admins/home/members');
      }, 2000);
      setShowModal(true);
    }

    if (success && location.pathname.includes('/home/signup')) {
      history.push('/home/login');
    }

    if (error) {
      setShowModalError(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, error]);

  const onSubmit = (data) => {
    dispatch(createMember(data));
  };

  if (location.pathname.includes('/home/signup')) {
    return (
      <section className={styles.signupContainer}>
        <Aside />
        <div className={styles.signup}>
          <div className={styles.box}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
                </div>
              </div>
              <div className={styles.signupButton}>
                <Button text={'Add'} variant={'add'} submitting />
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
      <div className={styles.box}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          data-testid={'member-add-form'}
        >
          <h2 className={styles.formTitle}>ADD MEMBER</h2>
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
            <label>Is Active?</label>
            <input
              className={styles.checkbox}
              name={'isActive'}
              type="checkbox"
              {...register('isActive')}
            />
          </div>

          <div className={styles.formBtns}>
            <Link to="/admins/home/members">
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
