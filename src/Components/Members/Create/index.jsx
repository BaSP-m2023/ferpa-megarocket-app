import React from 'react';
import styles from './addMembers.module.css';
import { Input, Select, DatePicker } from 'Components/Shared/Inputs';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createMember } from 'redux/members/thunks';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const MembersCreate = () => {
  const schema = Joi.object({
    firstName: Joi.string().min(3),
    lastName: Joi.string().min(3),
    dni: Joi.number()
      .min(1000000)
      .message({ 'number.min': '"dni" length must be at least 7 characters long' }),
    phone: Joi.number()
      .min(1000000000)
      .max(9999999999)
      .message({ 'number.min': '"phone" length must be 10 characters long' }),
    email: Joi.string()
      .pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
      .message({ 'string.pattern.base': 'Invalid "email" format' }),
    city: Joi.string().min(2).max(30),
    birthDay: Joi.date().max('now'),
    postalCode: Joi.number()
      .min(1000)
      .max(99999)
      .message({ 'number.min': '"postal code" length must be 4-5 characters long' }),
    isActive: Joi.boolean(),
    membership: Joi.string().valid('Classic', 'Only Classes', 'Black')
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

  const activeTypes = [
    {
      _id: 1,
      name: 'Yes',
      value: true
    },
    {
      _id: 2,
      name: 'No',
      value: false
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
    resolver: joiResolver(schema)
  });

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        history.push('/members');
      }, 2000);
      setShowModal(true);
    }
    if (error) {
      setShowModalError(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, error]);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(createMember(data));
  };

  return (
    <div className={styles.container}>
      <Modal
        onClose={() => setShowModalError(false)}
        isOpen={showModalError}
        title={message}
        error
      />
      <Modal onClose={() => setShowModal(false)} isOpen={showModal} title={message} success />;
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <h3 className={styles.whiteLetters}>Create new member</h3>
          <div>
            <Input
              labelText={'Name'}
              type={'text'}
              placeholder={'Name'}
              nameValue={'firstName'}
              register={register}
              error={errors.firstName?.message}
            />
          </div>
          <div>
            <Input
              labelText={'Surname'}
              type={'text'}
              placeholder={'Surname'}
              nameValue={'lastName'}
              register={register}
              error={errors.lastName?.message}
            />
          </div>
          <div>
            <Input
              labelText={'DNI'}
              type={'text'}
              placeholder={'DNI'}
              nameValue={'dni'}
              register={register}
              error={errors.dni?.message}
            />
          </div>
          <div>
            <Input
              labelText={'Phone'}
              type={'text'}
              placeholder={'ex: 096513178'}
              nameValue={'phone'}
              register={register}
              error={errors.phone?.message}
            />
          </div>
          <div>
            <Input
              labelText={'Email'}
              type={'text'}
              placeholder={'robertomariaoverdrive@soybostero.edu'}
              nameValue={'email'}
              register={register}
              error={errors.email?.message}
            />
          </div>
          <div>
            <Input
              labelText={'City'}
              type={'text'}
              placeholder={'Your city'}
              nameValue={'city'}
              register={register}
              error={errors.city?.message}
            />
          </div>
          <div>
            <DatePicker
              label={'Birthday'}
              nameValue={'birthDay'}
              register={register}
              error={errors.birthDay?.message}
            />
          </div>
          <div>
            <Input
              labelText={'Zip Code'}
              type={'text'}
              placeholder={'Your postal code'}
              nameValue={'postalCode'}
              register={register}
              error={errors.postalCode?.message}
            />
          </div>
          <div>
            <Select
              label={'Membership'}
              placeholder={'Classic'}
              options={memberships}
              nameValue={'membership'}
              register={register}
              error={errors.membership?.message}
            />
          </div>
          <div>
            <Select
              label={'Is active?'}
              options={activeTypes}
              nameValue={'isActive'}
              register={register}
              error={errors.isActive?.message}
            />
          </div>
          <div className={styles.theButtons}>
            <Link to="/members">
              <Button text={'Cancel'} variant={'white'} />
            </Link>
            <Button text={'Add new member'} variant={'add'} submitting />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MembersCreate;
