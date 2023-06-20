import React from 'react';
import styles from './form.module.css';
import { Link, useHistory } from 'react-router-dom';
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

const Form = () => {
  const { isPending, subs, message, id, error } = useSelector((state) => state.subscriptions);
  const { classes } = useSelector((state) => state.classes);
  const { data } = useSelector((state) => state.members);
  const members = data;
  const dispatch = useDispatch();
  const [currentSub, setCurrentSub] = useState({ classId: '', memberId: '', date: '' });
  const [modalError, setModalError] = useState(false);
  const [values, setValues] = useState({ member: '', activity: '' });
  const history = useHistory();

  const onRedirect = {
    pathname: '/admins/home/subscriptions',
    state: { message: '' }
  };

  const selectActivities = classes.map((obj) => {
    return { _id: obj?._id, name: `${obj?.activityId?.name}, ${obj?.day}, ${obj?.hour} hrs` };
  });

  const selectMembers = members.map((obj) => {
    return { _id: obj?._id, name: `${obj?.lastName}, ${obj?.firstName}` };
  });

  const handleClassId = (value) => {
    const classId = selectActivities.find((obj) => obj.name === value);
    if (classId) {
      setCurrentSub((prev) => ({ ...prev, classId: classId._id }));
    }
  };

  const handleMemberId = (value) => {
    const memberId = selectMembers.find((obj) => obj.name === value);
    if (memberId) {
      setCurrentSub((prev) => ({ ...prev, memberId: memberId._id }));
    }
  };

  useEffect(() => {
    getMembers(dispatch);
    dispatch(getClasses());
    if (id !== '') {
      const editSub = subs.find((sub) => sub._id === id);
      console.log(editSub);
      setCurrentSub({
        memberId: editSub.memberId?._id,
        classId: editSub.classId?._id,
        date: editSub.date.slice(0, 10)
      });
      setValues({
        member: `${editSub.memberId?.lastName}, ${editSub.memberId?.firstName}`,
        activity: `${editSub.classId?.activityId?.name}, ${editSub.classId?.day}, ${editSub.classId?.hour} hrs`
      });
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

  const handleClick = async () => {
    !id
      ? await postSubscriptions(dispatch, currentSub)
      : await updateSubscription(dispatch, currentSub, id);
    const updatedState = store.getState();
    const updatedError = updatedState.subscriptions.error;
    console.log(updatedError);
    if (!updatedError) {
      onRedirect.state.message = message;
      history.push(onRedirect);
    } else {
      setModalError(true);
    }
  };

  const handleDatePicker = (dateValue) => {
    setCurrentSub((prev) => ({ ...prev, date: dateValue }));
  };

  return (
    <section className={styles.container}>
      <Modal
        isOpen={modalError}
        error
        title={message}
        onClose={() => setModalError(!modalError)}
      ></Modal>
      <form className={styles.form}>
        <h2 className={styles.formTitle}>{id ? 'EDIT SUBSCRIPTION' : 'ADD SUBSCRIPTION'}</h2>
        {isPending ? (
          ''
        ) : (
          <div>
            <div className={styles.inputBox}>
              <Select
                placeholder={'Select'}
                label={'Member'}
                value={values.member}
                options={selectMembers}
                onChangeSelect={(e) => {
                  handleMemberId(e.target.value);
                  setValues((e) => (prev) => ({ ...prev, member: e.target.id }));
                }}
              />
            </div>
            <div className={styles.inputBox}>
              <Select
                placeholder={'Select'}
                label={'Activity'}
                value={values.activity}
                options={selectActivities}
                onChangeSelect={(e) => {
                  handleClassId(e.target.value);
                  setValues((e) => (prev) => ({ ...prev, activity: e.target.id }));
                }}
              />
            </div>
            <div className={styles.inputBox}>
              <DatePicker label={'Date'} value={currentSub.date} onChangeDate={handleDatePicker} />
            </div>
            <div className={styles.formBtns}>
              <Link to={'/admins/home/subscriptions'}>
                <Button variant={'white'} text={'Cancel'} />
              </Link>
              <Button
                variant={'add'}
                text={id ? 'Edit' : 'Add'}
                clickAction={(e) => {
                  e.preventDefault();
                  handleClick();
                }}
              />
            </div>{' '}
          </div>
        )}
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
