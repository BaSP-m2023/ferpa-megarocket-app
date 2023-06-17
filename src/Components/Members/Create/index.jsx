import React from 'react';
import styles from './addMembers.module.css';
import { Input, Select, DatePicker } from '../../Shared/Inputs';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createMember } from '../../../redux/members/thunks';

const MembersCreate = () => {
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
    membership: 'Classic'
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

  const handleOnChange = (event) => {
    setMember({
      ...member,
      [event.target.name]: event.target.value
    });
  };

  const handleBirthdayChange = (e) => {
    setMember({ ...member, birthDay: e });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createMember(member));
    console.log(member);
  };

  return (
    <div className={styles.container}>
      <Modal
        onClose={() => setShowModalError(false)}
        isOpen={showModalError}
        title={message}
        error
      />
      ;
      <Modal onClose={() => setShowModal(false)} isOpen={showModal} title={message} success />;
      <div>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
          <h3 className={styles.whiteLetters}>Create new member</h3>
          <div>
            <Input
              labelText={'Name'}
              type={'text'}
              placeholder={'Name'}
              value={member.firstName}
              onChangeInput={handleOnChange}
              nameValue={'firstName'}
            />
          </div>
          <div>
            <Input
              labelText={'Surname'}
              type={'text'}
              placeholder={'Surname'}
              value={member.lastName}
              onChangeInput={handleOnChange}
              nameValue={'lastName'}
            />
          </div>
          <div>
            <Input
              labelText={'DNI'}
              type={'text'}
              placeholder={'DNI'}
              value={member.dni}
              onChangeInput={handleOnChange}
              nameValue={'dni'}
            />
          </div>
          <div>
            <Input
              labelText={'Phone'}
              type={'text'}
              placeholder={'ex: 096513178'}
              value={member.phone}
              nameValue={'phone'}
              onChangeInput={handleOnChange}
            />
          </div>
          <div>
            <Input
              labelText={'Email'}
              type={'text'}
              placeholder={'robertomariaoverdrive@soybostero.edu'}
              value={member.email}
              nameValue={'email'}
              onChangeInput={handleOnChange}
            />
          </div>
          <div>
            <Input
              labelText={'City'}
              type={'text'}
              placeholder={'Your city'}
              value={member.city}
              nameValue={'city'}
              onChangeInput={handleOnChange}
            />
          </div>
          <div>
            <DatePicker
              label={'Birthday'}
              nameValue={'birthDay'}
              onChangeDate={handleBirthdayChange}
            />
          </div>
          <div>
            <Input
              labelText={'Zip Code'}
              type={'text'}
              placeholder={'Your postal code'}
              value={member.postalCode}
              nameValue={'postalCode'}
              onChangeInput={handleOnChange}
            />
          </div>
          <div>
            <Select
              label={'Membership'}
              value={memberships.value}
              placeholder={'Classic'}
              onChangeSelect={handleOnChange}
              options={memberships}
              nameValue={'membership'}
            />
          </div>
          <div className={styles.theButtons}>
            <Link to="/members">
              <Button text={'Cancel'} variant={'white'} />
            </Link>
            <Button text={'Add new member'} variant={'add'} clickAction={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MembersCreate;
