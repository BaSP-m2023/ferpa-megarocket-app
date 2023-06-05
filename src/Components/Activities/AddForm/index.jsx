import React from 'react';
import styles from './addform.module.css';
import { Input, TextArea } from '../../Shared/Inputs';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';

const AddForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const onAdd = async ({ name, description, isActive }) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/`, {
        method: 'POST',
        body: JSON.stringify({
          name,
          description,
          isActive
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onAdd({ name, description, isActive });
    setName('');
    setDescription('');
    setIsActive(false);
    setShowModal(true);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
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
      <div className={styles.formBox}>
        <h3 className={styles.title}>Add new activity</h3>
        <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
          <div className={styles.field}>
            <Input
              labelText={'Name'}
              type={'text'}
              placeholder={'Activity name'}
              value={name}
              onChangeInput={handleNameChange}
            />
          </div>
          <TextArea
            label={'Description'}
            value={description}
            placeholder={'Activity description'}
            onChangeArea={setDescription}
          />
          <div className={styles.checkboxField}>
            <label>Status</label>
            <input
              className={styles.checkbox}
              type="checkbox"
              value={isActive}
              checked={isActive}
              onChange={(e) => setIsActive(e.currentTarget.checked)}
            />
          </div>
          <div className={styles.btns}>
            <Link to="/activities">
              <Button text={'Cancel'} type={'white'} />
            </Link>
            <Button text={'Add'} type={'add'} clickAction={onSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
