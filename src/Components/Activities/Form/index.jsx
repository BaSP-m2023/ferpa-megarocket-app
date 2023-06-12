import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import { Input, TextArea } from '../../Shared/Inputs';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postActivity, putActivity } from '../../../redux/activities/thunks';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';

const Form = () => {
  const { data, message, success, error } = useSelector((state) => state.activities);
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleModal = () => {
    setShowModal(!showModal);
    setTimeout(() => {
      setShowModal();
    }, 4000);
  };

  useEffect(() => {
    if (success) {
      history.push('/activities');
    }
    if (error) {
      handleModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, error]);

  useEffect(() => {
    if (location.pathname.includes('edit')) {
      const activity = data.find((activity) => activity._id === id);
      setName(activity.name);
      setDescription(activity.description);
      setIsActive(activity.isActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const sendActivity = async () => {
    if (location.pathname.includes('create')) {
      await postActivity(dispatch, { name, description, isActive });
    }

    if (location.pathname.includes('edit')) {
      await putActivity(dispatch, id, { name, description, isActive });
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
