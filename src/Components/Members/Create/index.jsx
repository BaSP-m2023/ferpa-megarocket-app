import React from 'react';
import styles from './addMembers.module.css';
import { Input, Select, DatePicker } from '../../Shared/Inputs';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';

const MembersCreate = () => {
  const [member, setMember] = useState([]);

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

  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();

  const handleFirstName = (e) => {
    setMember({ ...member, firstName: e.target.value });
  };

  const handleLastName = (e) => {
    setMember({ ...member, lastName: e.target.value });
  };

  const handleDniChange = (e) => {
    setMember({ ...member, dni: e.target.value });
  };

  const handlePhoneChange = (e) => {
    setMember({ ...member, phone: e.target.value });
  };

  const handleEmailChange = (e) => {
    setMember({ ...member, email: e.target.value });
  };

  const handleCityChange = (e) => {
    setMember({ ...member, city: e.target.value });
  };

  const handleBirthdayChange = (e) => {
    setMember({ ...member, birthDay: e });
  };

  const handlePostalCodeChange = (e) => {
    setMember({ ...member, postalCode: e.target.value });
  };

  const handleMembershipChange = (e) => {
    setMember({ ...member, membership: e.target.value });
  };

  const handleIsActiveChange = (e) => {
    setMember({ ...member, isActive: e.target.value });
  };

  const addMember = async (member) => {
    try {
      const newMembers = await fetch(`${process.env.REACT_APP_API_URL}/api/members/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: member.firstName,
          lastName: member.lastName,
          dni: member.dni,
          phone: member.phone,
          email: member.email,
          city: member.city,
          birthDay: member.birthDay,
          postalCode: member.postalCode,
          isActive: member.isActive,
          membership: member.membership
        })
      });
      const data = await newMembers.json();
      setMessage(data.message);
      setShowModal(true);
      if (!data.error) {
        history.push('/members');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMember(member);
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
              value={member.firstName}
              onChangeInput={handleFirstName}
            />
          </div>
          <div>
            <Input
              labelText={'Surname'}
              type={'text'}
              placeholder={'Surname'}
              value={member.lastName}
              onChangeInput={handleLastName}
            />
          </div>
          <div>
            <Input
              labelText={'DNI'}
              type={'text'}
              placeholder={'DNI'}
              value={member.dni}
              onChangeInput={handleDniChange}
            />
          </div>
          <div>
            <Input
              labelText={'Phone'}
              type={'text'}
              placeholder={'ex: 096513178'}
              value={member.phone}
              onChangeInput={handlePhoneChange}
            />
          </div>
          <div>
            <Input
              labelText={'Email'}
              type={'text'}
              placeholder={'robertomariaoverdrive@soybostero.edu'}
              value={member.email}
              onChangeInput={handleEmailChange}
            />
          </div>
          <div>
            <Input
              labelText={'City'}
              type={'text'}
              placeholder={'Your city'}
              value={member.city}
              onChangeInput={handleCityChange}
            />
          </div>
          <div>
            <DatePicker
              label={'Birthday'}
              value={member.birthDay.slice(0, 10)}
              onChangeDate={handleBirthdayChange}
            />
          </div>
          <div>
            <Input
              labelText={'Zip Code'}
              type={'text'}
              placeholder={'Your postal code'}
              value={member.postalCode}
              onChangeInput={handlePostalCodeChange}
            />
          </div>
          <div>
            <Select
              label={'Is active?'}
              value={activeTypes.value}
              placeholder={'Yes'}
              onChangeSelect={handleIsActiveChange}
              options={activeTypes}
              nameValue={'day'}
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
