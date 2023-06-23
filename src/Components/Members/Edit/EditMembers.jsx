import React from 'react';
import styles from './editMembers.module.css';
import { Input, Select, DatePicker } from 'Components/Shared/Inputs';
import { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { updateMember } from 'redux/members/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { getMembers } from 'redux/members/thunks';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const MembersEdit = () => {
  const [member, setMember] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    birthDay: '',
    postalCode: '',
    isActive: true,
    membership: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const dispatch = useDispatch();
  const { data, message, success, error } = useSelector((state) => state.members);
  const history = useHistory();
  const { id } = useParams();

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

  const schema = Joi.object({
    firstName: Joi.string()
      .pattern(/^[A-Za-z]+$/)
      .min(3)
      .max(15)
      .messages({
        'string.pattern.base': 'First name must contain only letters'
      }),
    lastName: Joi.string()
      .pattern(/^[A-Za-z]+$/)
      .min(3)
      .max(15)
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
    email: Joi.string()
      .max(30)
      .pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
      .messages({
        'string.pattern.base': 'Invalid email format'
      }),
    city: Joi.string().min(2).max(30),
    birthDay: Joi.date().min('1930-01-01').max('2008-01-01'),
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

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: member
  });

  useEffect(() => {
    dispatch(getMembers());
    const memberToUpdate = data.find((member) => member._id === id);
    setMember({
      firstName: memberToUpdate?.firstName,
      lastName: memberToUpdate?.lastName,
      dni: memberToUpdate?.dni,
      phone: memberToUpdate?.phone,
      email: memberToUpdate?.email,
      city: memberToUpdate?.city,
      birthDay: memberToUpdate?.birthDay.slice(0, 10),
      postalCode: memberToUpdate?.postalCode,
      isActive: memberToUpdate?.isActive,
      membership: memberToUpdate?.membership
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (success) {
      setShowModal(true);
      setTimeout(() => {
        history.push('/admins/home/members');
      }, 2000);
    }
    if (error) {
      setShowModalError(true);
      setTimeout(() => {
        setShowModalError(false);
      }, 4000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, success]);

  useEffect(() => {
    reset(member);
  }, [member, reset]);

  const onSubmit = (data) => {
    dispatch(updateMember(id, data));
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
      <div className={styles.box}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <h2 className={styles.formTitle}>EDIT MEMBER</h2>
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
              <Button text={'Cancel'} variant={'white'} />
            </Link>
            <Button text={'Edit'} variant={'add'} submitting />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MembersEdit;
