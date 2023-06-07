import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import { Input, TextArea } from '../../Shared/Inputs';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import Button from '../../Shared/Button';

const Form = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const onRedirect = {
    pathname: '/activities',
    state: { message: '' }
  };

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
      onRedirect.state.message = data.message;
      history.push(onRedirect);
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
      onRedirect.state.message = data.message;
      history.push(onRedirect);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const sendActivity = async () => {
    if (location.pathname.includes('create')) {
      await onAdd({ name, description, isActive });
      setName('');
      setDescription('');
      setIsActive(false);
    }

    if (location.pathname.includes('edit')) {
      await onEdit(id);
    }
  };

  return (
    <div className={styles.formContainer}>
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
            <label>Is Active?</label>
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
              <Button text={'Cancel'} variant={'white'} />
            </Link>
            <Button
              text={location.pathname.includes('edit') ? 'Edit' : 'Add'}
              variant={'add'}
              clickAction={sendActivity}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
