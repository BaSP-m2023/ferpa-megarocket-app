import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses } from 'redux/classes/thunks';
import {
  getSubscriptions,
  postSubscriptions,
  deleteSubscriptions,
  selectId
} from 'redux/subscriptions/thunks';
import styles from './schedule.module.css';
import Modal from 'Components/Shared/Modal';
import Button from '../Shared/Button/index';
import Loader from 'Components/Shared/Loader';

const Schedule = () => {
  const role = sessionStorage.getItem('role');

  const { classes } = useSelector((state) => state.classes);
  const { user } = useSelector((state) => state.auth);
  const { isPending, subs, success, id, message } = useSelector((state) => state.subscriptions);
  const [classSelected, setClassSelected] = useState({});
  const [subscribeModal, setSubscribeModal] = useState(false);
  const [unsubscribeModal, setUnsubscribeModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [trainerModal, setTrainerModal] = useState(false);
  const [memberActiveModal, setMemberActiveModal] = useState(false);
  const [selectOption, setSelectOption] = useState('my-classes');

  const dispatch = useDispatch();

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hours = [];
  for (let i = 9; i <= 21; i++) {
    hours.push(i.toString().padStart(2, '0') + ':00');
  }

  const handleModal = () => {
    setSuccessModal(!successModal);
    setTimeout(() => {
      setSuccessModal();
    }, 2000);
  };

  useEffect(() => {
    if (success) {
      handleModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  useEffect(() => {
    dispatch(getClasses());
    getSubscriptions(dispatch);
  }, [dispatch, success]);

  const generateTd = ({ day, hour }) => {
    const classToShow = classes.find(
      (theClass) => theClass?.day === day && theClass?.hour === hour
    );
    const trainersClass = classToShow?.trainerId?._id === user._id;
    const subscribedClass = classToShow?.subscribers.some((sub) => user?._id === sub._id);
    const actualSub = subs.find((sub) => sub.classId?._id === classToShow?._id);
    const slots = 20 - classToShow?.subscribers.length;
    if (role === 'MEMBER' && subscribedClass && user?.isActive) {
      return (
        <td
          key={`${day}-${hour}`}
          className={styles.activeClass}
          onClick={() => {
            setUnsubscribeModal(!unsubscribeModal);
            setClassSelected(classToShow);
            selectId(dispatch, actualSub?._id);
          }}
        >
          {classToShow?.activityId?.name}
        </td>
      );
    }
    if (role === 'MEMBER' && classToShow && user?.isActive) {
      return (
        <>
          {classToShow?.subscribers.length !== 20 ? (
            <td
              key={`${day}-${hour}`}
              className={styles.whiteItem}
              onClick={() => {
                setSubscribeModal(!subscribeModal);
                setClassSelected(classToShow);
              }}
            >
              {classToShow?.activityId?.name}
              <br></br>
              <span className={styles.slots}>{`Slots: ${slots}`}</span>
            </td>
          ) : (
            <td key={`${day}-${hour}`} className={styles.disabledClass}>
              {classToShow?.activityId?.name}
              <br></br>
              <span className={styles.slots}>No more slots</span>
            </td>
          )}
        </>
      );
    }
    if (!user?.isActive && classToShow && role === 'MEMBER') {
      return (
        <>
          {classToShow?.subscribers.length !== 20 ? (
            <td
              key={`${day}-${hour}`}
              className={styles.whiteItem}
              onClick={() => {
                setMemberActiveModal(!memberActiveModal);
              }}
            >
              {classToShow?.activityId?.name}
              <br></br>
              <span className={styles.slots}>{`Slots: ${slots}`}</span>
            </td>
          ) : (
            <td key={`${day}-${hour}`} className={styles.disabledClass}>
              {classToShow?.activityId?.name}
              <br></br>
              <span className={styles.slots}>No more slots</span>
            </td>
          )}
        </>
      );
    }
    if (role === 'TRAINER' && trainersClass && selectOption === 'my-classes') {
      return (
        <td
          key={`${day}-${hour}`}
          className={styles.whiteItem}
          onClick={() => {
            setClassSelected(classToShow);
            setTrainerModal(!trainerModal);
          }}
        >
          {classToShow?.activityId?.name}
        </td>
      );
    }
    if (role === 'TRAINER' && classToShow && selectOption === 'all-classes') {
      return (
        <td
          key={`${day}-${hour}`}
          className={styles.whiteItem}
          onClick={() => {
            setClassSelected(classToShow);
            setTrainerModal(!trainerModal);
          }}
        >
          {classToShow?.activityId?.name}
        </td>
      );
    }
    return <td key={`${day}-${hour}`} className={styles.empty}></td>;
  };

  return (
    <section className={styles.container}>
      <Modal
        isOpen={memberActiveModal}
        title={'You must be an active user to subscribe!'}
        text={'A gym administrator will be activating your account as soon as possible.'}
        onClose={() => setMemberActiveModal(!memberActiveModal)}
        testid={'isActive-modal'}
      />
      <Modal
        isOpen={successModal}
        title={message}
        success
        onClose={() => setSubscribeModal(!successModal)}
        testid={'success-modal'}
      />
      <Modal
        isOpen={trainerModal}
        title={'Class Information'}
        text={
          <>
            {classSelected?.activityId?.name}
            <br></br>
            {classSelected?.day} {classSelected?.hour}
            <br></br>
            {`Trainer: ${classSelected?.trainerId?.firstName}`}
            <br></br>
            {classSelected?.subscribers?.length === 0
              ? 'No members yet'
              : `Members: ${classSelected?.subscribers
                  ?.map((member) => member?.firstName)
                  .join(', ')}`}
          </>
        }
        onClose={() => setTrainerModal(!trainerModal)}
        testid={'class-information-modal'}
      />
      <Modal
        title={'Subscribe to Class'}
        text={
          <>
            {classSelected?.activityId?.name}
            <br></br>
            {classSelected?.day} {classSelected?.hour}
            <br></br>
            {`Trainer: ${classSelected?.trainerId?.firstName}`}
          </>
        }
        isOpen={subscribeModal}
        onClose={() => {
          setSubscribeModal(!subscribeModal);
        }}
        testid={'subs-class-modal'}
      >
        <Button
          text={'Cancel'}
          type={'button'}
          clickAction={() => setSubscribeModal(!subscribeModal)}
          testid={'cancel-btn'}
        />
        <Button
          text={'Subscribe'}
          type={'button'}
          variant={'add'}
          clickAction={() => {
            postSubscriptions(dispatch, {
              classId: classSelected?._id,
              memberId: user?._id,
              date: new Date()
            });
            setSubscribeModal(!subscribeModal);
          }}
          testid={'subs-btn'}
        />
      </Modal>
      <Modal
        warning
        title={'Delete Subscription'}
        text={
          <>
            {classSelected?.activityId?.name}
            <br></br>
            {classSelected?.day} {classSelected?.hour}
            <br></br>
            {`Trainer: ${classSelected?.trainerId?.firstName}`}
          </>
        }
        isOpen={unsubscribeModal}
        onClose={() => {
          setUnsubscribeModal(!unsubscribeModal);
        }}
        testid={'delete-subs-modal'}
      >
        <Button
          text={'Cancel'}
          type={'button'}
          clickAction={() => setUnsubscribeModal(!unsubscribeModal)}
          testid={'cancel-btn'}
        />
        <Button
          text={'Unsubscribe'}
          type={'button'}
          variant={'delete'}
          clickAction={() => {
            deleteSubscriptions(dispatch, id);
            setUnsubscribeModal(!unsubscribeModal);
          }}
          testid={'unsubscribe-btn'}
        />
      </Modal>
      {!isPending ? (
        <>
          {role === 'TRAINER' && (
            <select
              className={styles.select}
              onChange={(e) => {
                setSelectOption(e.target.value);
              }}
            >
              <option value={'my-classes'}>My classes</option>
              <option value={'all-classes'}>All classes</option>
            </select>
          )}
          <table className={styles.table} data-testid={'schedule-container'}>
            <thead>
              <tr>
                <th className={styles.blueItem}>Hour</th>
                {days.map((day) => (
                  <th key={day} className={styles.blueItem}>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody data-testid={'schedule-activities'}>
              {hours.map((hour) => (
                <tr key={hour}>
                  <td className={styles.blueItem}>{hour}</td>
                  {days.map((day) => generateTd({ day, hour }))}
                </tr>
              ))}
            </tbody>
          </table>
          {role === 'MEMBER' && (
            <table className={styles.glossary} data-testid={'schedule-glossary'}>
              <thead>
                <tr>
                  <th className={styles.glossarySub}>Subscribed</th>
                  <th className={styles.glossaryClass}>Available</th>
                  <th className={styles.glossaryDis}>Disabled</th>
                </tr>
              </thead>
            </table>
          )}
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default Schedule;
