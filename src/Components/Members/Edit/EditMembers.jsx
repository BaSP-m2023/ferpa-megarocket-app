import React from 'react';
import styles from './editMembers.module.css';
import { Input, Select, DatePicker } from '../../Shared/Inputs';
import { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { updateMember } from '../../../redux/members/thunks';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../Shared/Button/index';
import Modal from '../../Shared/Modal';
import Loader from '../../Shared/Loader';

const MembersEdit = () => {
  const [member, setMember] = useState([]);
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

  useEffect(() => {
    const memberToUpdate = data.find((member) => member._id === id);
    setMember({
      firstName: memberToUpdate?.firstName ?? '',
      lastName: memberToUpdate?.lastName ?? '',
      dni: memberToUpdate?.dni ?? '',
      phone: memberToUpdate?.phone ?? '',
      email: memberToUpdate?.email ?? '',
      city: memberToUpdate?.city ?? '',
      birthDay: memberToUpdate?.birthDay ?? '',
      postalCode: memberToUpdate?.postalCode ?? '',
      isActive: memberToUpdate?.isActive ?? true,
      membership: memberToUpdate?.membership ?? ''
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (success) {
      setShowModal(true);
      setTimeout(() => {
        history.push('/members');
      }, 2000);
    }
    if (error) {
      setShowModalError(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, success]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMember(id, member));
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
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
          <h3 className={styles.whiteLetters}>Edit current member</h3>
          <div>
            {member.length !== 0 ? (
              <Input
                labelText={'Name'}
                type={'text'}
                value={member.firstName}
                onChangeInput={handleFirstName}
              />
            ) : (
              <Loader />
            )}
          </div>
          <div>
            {member.length !== 0 ? (
              <Input
                labelText={'Surname'}
                type={'text'}
                value={member.lastName}
                onChangeInput={handleLastName}
              />
            ) : (
              <Loader />
            )}
          </div>
          <div>
            {member.length !== 0 ? (
              <Input
                labelText={'DNI'}
                type={'text'}
                value={member.dni}
                onChangeInput={handleDniChange}
              />
            ) : (
              <Loader />
            )}
          </div>
          <div>
            {member.length !== 0 ? (
              <Input
                labelText={'Phone'}
                type={'text'}
                value={member.phone}
                onChangeInput={handlePhoneChange}
              />
            ) : (
              <Loader />
            )}
          </div>
          <div>
            {member.length !== 0 ? (
              <Input
                labelText={'Email'}
                type={'text'}
                value={member.email}
                onChangeInput={handleEmailChange}
              />
            ) : (
              <Loader />
            )}
          </div>
          <div>
            {member.length !== 0 ? (
              <Input
                labelText={'City'}
                type={'text'}
                value={member.city}
                onChangeInput={handleCityChange}
              />
            ) : (
              <Loader />
            )}
          </div>
          <div>
            {member.length !== 0 ? (
              <DatePicker
                label={'Birthday'}
                value={member.birthDay.slice(0, 10)}
                onChangeDate={handleBirthdayChange}
              />
            ) : (
              <Loader />
            )}
          </div>
          <div>
            {member.length !== 0 ? (
              <Input
                labelText={'Zip Code'}
                type={'text'}
                value={member.postalCode}
                onChangeInput={handlePostalCodeChange}
              />
            ) : (
              <Loader />
            )}
          </div>
          <div>
            {member.length !== 0 ? (
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
            ) : (
              <Loader />
            )}
          </div>
          <div>
            {member.length !== 0 ? (
              <div>
                <Select
                  label={'Membership'}
                  value={memberships.value}
                  placeholder={member.membership}
                  onChangeSelect={handleMembershipChange}
                  options={memberships}
                  nameValue={'day'}
                />
              </div>
            ) : (
              <Loader />
            )}
          </div>
          <div className={styles.theButtons}>
            <Link to="/members">
              <Button text={'Cancel'} variant={'white'} />
            </Link>
            <Button text={'Update'} variant={'add'} clickAction={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MembersEdit;
