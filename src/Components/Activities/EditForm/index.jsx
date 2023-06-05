import React, { useEffect, useState } from 'react';
import styles from './editform.module.css';
import { Input, TextArea } from '../../Shared/Inputs';
import { Link, useParams } from 'react-router-dom';

const EditForm = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(false);

  const getActivity = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`);
      const { data } = await res.json();
      setName(data.name);
      setDescription(data.description);
      setIsActive(data.isActive);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getActivity(id);
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
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onEdit(id);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formBox}>
        <h3 className={styles.title}>Edit activity</h3>
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
              onChange={(e) => setIsActive(e.target.value)}
            />
          </div>
          <div className={styles.btns}>
            <Link to="/activities">
              <button>Cancel</button>
            </Link>
            <button type="submit">Edit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
