import React from 'react';
import styles from './editMembers.module.css';
import { Input } from '../../Shared/Inputs';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../Shared/Button/index';
import Modal from '../../Shared/Modal';

const MembersEdit = () => {
  const [member, setMember] = useState([]);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();

  const getMember = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`);
      const data = await response.json();
      setMember(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMember(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setMember({ ...member, birthDay: e.target.value });
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

  const updateMember = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: member.firstName,
          lastName: lastName,
          dni: dni,
          phone: phone,
          email: email,
          city: city,
          birthDay: birthDay,
          postalCode: postalCode,
          isActive: isActive,
          membership: membership
        })
      });

      const data = await response.json();
      setMessage(data.message);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMember(id);
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
            {member ? (
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
            {member ? (
              <Input
                labelText={'Surname'}
                type={'text'}
                value={lastName}
                onChangeInput={handleLastName}
              />
            ) : (
              <div> Loading...</div>
            )}
          </div>
          <div>
            {member ? (
              <Input labelText={'DNI'} type={'text'} value={dni} onChangeInput={handleDniChange} />
            ) : (
              <div> Loading...</div>
            )}
          </div>
          <div>
            {member ? (
              <Input
                labelText={'Phone'}
                type={'text'}
                value={phone}
                onChangeInput={handlePhoneChange}
              />
            ) : (
              <div> Loading...</div>
            )}
          </div>
          <div>
            {member ? (
              <Input
                labelText={'Email'}
                type={'text'}
                value={email}
                onChangeInput={handleEmailChange}
              />
            ) : (
              <div> Loading...</div>
            )}
          </div>
          <div>
            {member ? (
              <Input
                labelText={'City'}
                type={'text'}
                value={city}
                onChangeInput={handleCityChange}
              />
            ) : (
              <div> Loading...</div>
            )}
          </div>
          <div>
            {member ? (
              <Input
                labelText={'Birthday'}
                type={'text'}
                value={birthDay}
                onChangeInput={handleBirthdayChange}
              />
            ) : (
              <div> Loading...</div>
            )}
          </div>
          <div>
            {member ? (
              <Input
                labelText={'Zip Code'}
                type={'text'}
                value={postalCode}
                onChangeInput={handlePostalCodeChange}
              />
            ) : (
              <div> Loading...</div>
            )}
          </div>
          <div>
            {member ? (
              <div>
                <label>Its Active?</label>
                <select onChange={handleIsActiveChange}>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
            ) : (
              <div> Loading...</div>
            )}
          </div>
          <div>
            {member ? (
              <label>
                Membership:
                <select onChange={handleMembershipChange}>
                  <option value="Classic">Classic</option>
                  <option value="Only Classes">Only Classes</option>
                  <option value="Black">Black Membership</option>
                </select>
              </label>
            ) : (
              <div> Loading...</div>
            )}
          </div>
          <div>
            <Link to="/members">
              <Button text={'return'} type={'white'} />
            </Link>
            <Button text={'Update'} type={'add'} clickAction={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MembersEdit;
