import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import { Input, TextArea } from '../../Shared/Inputs';
import { Link, useParams, useLocation } from 'react-router-dom';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';

const Form = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const getActivity = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`);
      const { data } = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (location.pathname.includes('edit')) {
      const setupForm = async () => {
        const { name, description, isActive } = await getActivity(id);
        setName(name);
        setDescription(description);
        setIsActive(isActive);
      };
      setupForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEdit = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
        method: 'PUT',
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

  const onAdd = async () => {
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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const sendActivity = () => {
    setShowModal(true);

    if (location.pathname.includes('create')) {
      onAdd({ name, description, isActive });
      setName('');
      setDescription('');
      setIsActive(false);
      setShowModal(true);
    }

    if (location.pathname.includes('edit')) {
      onEdit(id);
    }
  };

  return (
    <div className={styles.formContainer}>
      <Modal onClose={() => setShowModal(false)} isOpen={showModal} title={message} success />
      <div className={styles.formBox}>
        <h3 className={styles.title}>
          {location.pathname.includes('create') ? 'Add New Activity' : 'Edit Activity'}
        </h3>
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
            placeholder={'Activity description'}
            value={description}
            onChangeArea={setDescription}
          />
          <div className={styles.checkboxField}>
            <label>Status</label>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={isActive}
              value={isActive}
              onChange={(e) => setIsActive(e.currentTarget.checked)}
            />
          </div>
          <div className={styles.btns}>
            <Link to="/activities">
              <Button text={'Cancel'} type={'white'} />
            </Link>
            <Button
              text={location.pathname.includes('edit') ? 'Edit' : 'Add'}
              type={'add'}
              clickAction={sendActivity}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
