import React from 'react';
import styles from './editMembers.module.css';
import { Input, Select, DatePicker } from '../../Shared/Inputs';
import { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { updateMember, getMemberById } from '../../../redux/members/thunks';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../Shared/Button/index';
import Modal from '../../Shared/Modal';

const MembersEdit = () => {
  const [member, setMember] = useState([]);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.members);
  const history = useHistory();

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

  const { id } = useParams();

  useEffect(() => {
    console.log(data.getById.data);
    setMember({
      firstName: data.getById.data?.firstName ?? '',
      lastName: data.getById.data?.lastName ?? '',
      dni: data.getById.data?.dni ?? '',
      phone: data.getById.data?.phone ?? '',
      email: data.getById.data?.email ?? '',
      city: data.getById.data?.city ?? '',
      birthDay: data.getById.data?.birthDay ?? '',
      postalCode: data.getById.data?.postalCode ?? '',
      isActive: data.getById.data?.isActive ?? true,
      membership: data.getById.data?.membership ?? 'Classic'
    });
  }, [data.getById.data, data.getById.success]);

  useEffect(() => {
    dispatch(getMemberById(id));
    setMessage(data.put.message);
    if (data.put.success) {
      history.push('/members');
      data.put.success = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.put.message, data.put.success]);

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
    setShowModal(true);
  };

  return (
    <div className={styles.container}>
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
              <div> Loading...</div>
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
              <div> Loading...</div>
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
              <div> Loading...</div>
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
              <div> Loading...</div>
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
              <div> Loading...</div>
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
              <div> Loading...</div>
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
              <div> Loading...</div>
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
              <div> Loading...</div>
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
              <div> Loading...</div>
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
              <div> Loading...</div>
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
