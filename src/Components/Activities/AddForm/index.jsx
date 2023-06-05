import React from 'react';
import styles from './addform.module.css';
import { Input, TextArea } from '../../Shared/Inputs';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const AddForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(false);

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
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onAdd({ name, description, isActive });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.title}>Add new activity</h3>
      <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
        <Input
          labelText={'Name'}
          type={'text'}
          placeholder={'Activity name'}
          value={name}
          onChangeInput={handleNameChange}
        />
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
            onChange={(e) => setIsActive(e.target.value)}
          />
        </div>
        <div className={styles.btns}>
          <Link to="/activities">
            <button>Cancel</button>
          </Link>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
