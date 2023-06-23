import React from 'react';
import styles from './form.module.css';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Select, DatePicker } from '../../Shared/Inputs';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';
import { postSubscriptions, updateSubscription } from '../../../redux/subscriptions/thunks';
import { getClasses } from '../../../redux/classes/thunks';
import { getMembers } from '../../../redux/members/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../redux/store';
import Loader from '../../Shared/Loader';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const Form = () => {
  const { id } = useParams();
  const { isPending, subs, message, error } = useSelector((state) => state.subscriptions);
  const { classes } = useSelector((state) => state.classes);
  const { data: members } = useSelector((state) => state.members);
  const dispatch = useDispatch();
  const [currentSub, setCurrentSub] = useState({ classId: '', memberId: '', date: '' });
  const [modalError, setModalError] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const firstMember = members[0];

  const now = new Date().toISOString().split('T')[0];

  const schema = Joi.object({
    memberId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .message({
        'string.pattern.base': 'Invalid format ID'
      }),
    classId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .message({
        'string.pattern.base': 'Invalid format ID'
      }),
    date: Joi.date().min(now).message({
      'date.min': 'You cannot subscribe to classes that have already occurred.'
    })
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: currentSub
  });

  useEffect(() => {
    dispatch(getMembers());
    dispatch(getClasses());
    if (id) {
      const editSub = subs.find((sub) => sub._id === id);
      setCurrentSub({
        memberId: editSub?.memberId?._id,
        classId: editSub?.classId?._id,
        date: editSub?.date.slice(0, 10)
      });
    }
    if (location.pathname.includes('/members/home/subscriptions/form')) {
      setCurrentSub({ ...currentSub, memberId: firstMember._id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (modalError) {
      setTimeout(() => {
        setModalError(!modalError);
      }, 2000);
    }
  }, [modalError]);

  useEffect(() => {
    reset(currentSub);
  }, [currentSub, reset]);

  const pathname = location.pathname.includes('/members/home/subscriptions/form')
    ? '/members/home/subscriptions'
    : '/admins/home/subscriptions';

  const onRedirect = {
    pathname,
    state: { message: '' }
  };

  const selectActivities = classes.map((obj) => {
    return {
      _id: obj?._id,
      value: obj?._id,
      name: `${obj?.activityId?.name}, ${obj?.day}, ${obj?.hour} hrs`
    };
  });

  const selectMembers = members.map((obj) => {
    return { _id: obj?._id, value: obj?._id, name: `${obj?.lastName}, ${obj?.firstName}` };
  });

  const onSubmit = async (data) => {
    !id ? await postSubscriptions(dispatch, data) : await updateSubscription(dispatch, data, id);
    const updatedState = store.getState();
    const updatedError = updatedState.subscriptions.error;
    if (!updatedError) {
      onRedirect.state.message = message;
      history.push(onRedirect);
    } else {
      setModalError(true);
    }
  };

  return (
    <section className={styles.container}>
      <Modal isOpen={modalError} error title={message} onClose={() => setModalError(!modalError)} />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.formTitle}>{id ? 'EDIT SUBSCRIPTION' : 'ADD SUBSCRIPTION'}</h2>
        <div>
          {location.pathname.includes('/members/home/subscriptions/form') ? (
            <div className={styles.hidden}>
              <Select
                nameValue={'memberId'}
                register={register}
                label={'Member'}
                options={selectMembers}
                error={errors.memberId?.message}
              />
            </div>
          ) : (
            <div className={styles.inputBox}>
              <Select
                nameValue={'memberId'}
                register={register}
                placeholder={'Select'}
                label={'Member'}
                options={selectMembers}
                error={errors.memberId?.message}
              />
            </div>
          )}
          <div className={styles.inputBox}>
            <Select
              nameValue={'classId'}
              register={register}
              placeholder={'Select'}
              label={'Class'}
              options={selectActivities}
              error={errors.classId?.message}
            />
          </div>
          <div className={styles.inputBox}>
            <DatePicker
              nameValue={'date'}
              register={register}
              label={'Date'}
              error={errors.date?.message}
            />
          </div>
          <div className={styles.formBtns}>
            {location.pathname.includes('/members/home/subscriptions/form') ? (
              <Link to={'/members/home/subscriptions'}>
                <Button variant={'white'} text={'Cancel'} />
              </Link>
            ) : (
              <Link to={'/admins/home/subscriptions'}>
                <Button variant={'white'} text={'Cancel'} />
              </Link>
            )}
            <Button variant={'add'} text={id ? 'Edit' : 'Add'} submitting />
          </div>
        </div>
        {isPending ? (
          <div className={styles.loading}>
            <Loader />
          </div>
        ) : (
          ''
        )}
        {error !== '' ? <p>{error}</p> : ''}
      </form>
    </section>
  );
};

export default Form;
