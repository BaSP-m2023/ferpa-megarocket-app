import React from 'react';
import styles from './editMembers.module.css';
import { Input } from '../../Shared/Inputs';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../Shared/Button/index';
import Modal from '../../Shared/Modal';

const MembersEdit = () => {
  const [member, setMember] = useState([]);
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

  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();

  const getMember = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`);
      const data = await response.json();
      setMember(data.data);
      setFirstName(member.firstName);
      setLastName(member.lastName);
      setDni(member.dni);
      setPhone(member.phone);
      setEmail(member.email);
      setCity(member.city);
      setBirthday(member.birthDay);
      setPostalCode(member.postalCode);
      setIsActive(member.isActive);
      setMembership(member.membership);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMember(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member]);

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
    setBirthday(e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleMembershipChange = (e) => {
    setMembership(e.target.value);
  };

  const handleIsActiveChange = (e) => {
    setIsActive(e.target.value);
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
    setShowModal(true);
  };

  return (
    <div className={styles.formContainer}>
      <Modal
        onClose={() => setShowModal(false)}
        isOpen={showModal}
        title={message}
        success={true}
      />
      ;
      <div>
        <h3>Edit current member</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
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
            <Input
              labelText={'Birthday'}
              type={'text'}
              placeholder={'01/01/2000'}
              value={birthDay}
              onChangeInput={handleBirthdayChange}
            />
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
            <label>Its Active?</label>
            <select onChange={handleIsActiveChange}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div>
            <label>
              Membership:
              <select onChange={handleMembershipChange}>
                <option value="Classic">Classic</option>
                <option value="Only Classes">Only Classes</option>
                <option value="Black">Black Membership</option>
              </select>
            </label>
          </div>
          <div>
            <Link to="/members">
              <Button text={'return'} type={'white'} />
            </Link>
            <Button text={'Create'} type={'add'} clickAction={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MembersEdit;
