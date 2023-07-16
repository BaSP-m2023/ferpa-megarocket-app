import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import { Input, TextArea } from '../../Shared/Inputs';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postActivity, putActivity } from '../../../redux/activities/thunks';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';
import Loader from '../../Shared/Loader';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const Form = () => {
  const { data, message, success, error, isPending } = useSelector((state) => state.activities);
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^[a-zA-Z0-9.,\s]+$/)
      .min(3)
      .max(30)
      .messages({
        'string.pattern.base': 'Name must contain only letters'
      }),
    description: Joi.string()
      .pattern(/^[a-zA-Z0-9.,\s]+$/)
      .min(5)
      .max(250)
      .messages({
        'string.pattern.base': 'Description must contain only letters'
      }),
    isActive: Joi.boolean()
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: { name, description, isActive }
  });

  const handleModal = () => {
    setShowModal(!showModal);
    setTimeout(() => {
      setShowModal();
    }, 4000);
  };

  useEffect(() => {
    if (success) {
      history.push('/admin/activities');
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

  useEffect(() => {
    reset({ name, description, isActive });
  }, [name, description, isActive, reset]);

  const onSubmit = async (data) => {
    if (location.pathname.includes('create')) {
      await postActivity(dispatch, data);
    }

    if (location.pathname.includes('edit')) {
      await putActivity(dispatch, id, data);
    }
  };

  return (
    <div className={styles.container}>
      <Modal onClose={() => setShowModal(false)} isOpen={showModal} title={message} error />
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        data-testid={'activities-editform'}
      >
        <h2 className={styles.formTitle}>{!id ? 'ADD ACTIVITY' : 'EDIT ACTIVITY'}</h2>
        {isPending ? (
          <Loader />
        ) : (
          <div>
            <div className={styles.inputBox}>
              <Input
                nameValue={'name'}
                labelText={'Name'}
                type={'text'}
                placeholder={'Activity name'}
                register={register}
                error={errors.name?.message}
              />
            </div>
            <div className={styles.inputBox}>
              <TextArea
                nameValue={'description'}
                label={'Description'}
                placeholder={'Activity description'}
                register={register}
                error={errors.description?.message}
              />
            </div>
            <div className={styles.checkboxField}>
              <label>Is Active?</label>
              <input
                className={styles.checkbox}
                name={'isActive'}
                type="checkbox"
                {...register('isActive')}
              />
              {errors.isActive && <span>{errors.isActive.message}</span>}
            </div>
            <div className={styles.formBtns}>
              <Link to="/admin/activities">
                <Button text={'Cancel'} variant={'white'} testid={'cancel-btn'} />
              </Link>
              <Button text={id ? 'Edit' : 'Add'} variant={'add'} submitting testid={'add-btn'} />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
