import React from 'react';
import styles from './addMembers.module.css';
import { Input, Select, DatePicker } from '../../Shared/Inputs';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';

const MembersCreate = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [birthDay, setBirthday] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [membership, setMembership] = useState('Classic');

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

  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleDniChange = (e) => {
    const value = e.target.value;
    setDni(value);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleBirthdayChange = (e) => {
    setBirthday(e);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleMembershipChange = (e) => {
    setMembership(e.target.value);
  };

  const addMember = async ({
    firstName,
    lastName,
    dni,
    phone,
    email,
    city,
    birthDay,
    postalCode,
    isActive,
    membership
  }) => {
    try {
      const newMembers = await fetch(`${process.env.REACT_APP_API_URL}/api/members/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          dni,
          phone,
          email,
          city,
          birthDay,
          postalCode,
          isActive,
          membership
        })
      });
      const data = await newMembers.json();
      setMessage(data.message);
      setShowModal(true);
      if (!data.error) {
        setFirstName('');
        setLastName('');
        setDni('');
        setPhone('');
        setEmail('');
        setCity('');
        setBirthday('');
        setPostalCode('');
        setIsActive(true);
        setMembership('Classic');
        history.push('/members');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMember({
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      birthDay,
      postalCode,
      isActive,
      membership
    });
  };

  return (
    <div className={styles.container}>
      <Modal onClose={() => setShowModal(false)} isOpen={showModal} title={message} success />;
      <div>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
          <h3 className={styles.whiteLetters}>Create new member</h3>
          <div>
            <Input
              labelText={'Name'}
              type={'text'}
              placeholder={'Name'}
              value={firstName}
              onChangeInput={handleFirstName}
            />
          </div>
          <div>
            <Input
              labelText={'Surname'}
              type={'text'}
              placeholder={'Surname'}
              value={lastName}
              onChangeInput={handleLastName}
            />
          </div>
          <div>
            <Input
              labelText={'DNI'}
              type={'text'}
              placeholder={'DNI'}
              value={dni}
              onChangeInput={handleDniChange}
            />
          </div>
          <div>
            <Input
              labelText={'Phone'}
              type={'text'}
              placeholder={'ex: 096513178'}
              value={phone}
              onChangeInput={handlePhoneChange}
            />
          </div>
          <div>
            <Input
              labelText={'Email'}
              type={'text'}
              placeholder={'robertomariaoverdrive@soybostero.edu'}
              value={email}
              onChangeInput={handleEmailChange}
            />
          </div>
          <div>
            <Input
              labelText={'City'}
              type={'text'}
              placeholder={'Your city'}
              value={city}
              onChangeInput={handleCityChange}
            />
          </div>
          <div>
            <DatePicker label={'Birthday'} value={birthDay} onChangeDate={handleBirthdayChange} />
          </div>
          <div>
            <Input
              labelText={'Zip Code'}
              type={'text'}
              placeholder={'Your postal code'}
              value={postalCode}
              onChangeInput={handlePostalCodeChange}
            />
          </div>
          <div>
            <Select
              label={'Membership'}
              value={memberships.value}
              placeholder={'Classic'}
              onChangeSelect={handleMembershipChange}
              options={memberships}
              nameValue={'day'}
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
