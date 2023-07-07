import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses } from 'redux/classes/thunks';
import { postSubscriptions, deleteSubscriptions, selectId } from 'redux/subscriptions/thunks';
import styles from './schedule.module.css';
import Modal from 'Components/Shared/Modal';
import Button from '../Shared/Button/index';

const Schedule = () => {
  const { classes } = useSelector((state) => state.classes);
  const { user } = useSelector((state) => state.auth);
  const { subs, success, id } = useSelector((state) => state.subscriptions);
  const [classSelected, setClassSelected] = useState({});
  const [subscribeModal, setSubscribeModal] = useState(false);
  const [unsubscribeModal, setUnsubscribeModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [successDeleteModal, setSuccessDeleteModal] = useState(false);
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

  const handleDeleteModal = () => {
    setSuccessDeleteModal(!successDeleteModal);
    setTimeout(() => {
      setSuccessDeleteModal();
    }, 2000);
  };

  useEffect(() => {
    if (success) {
      handleModal();
      handleDeleteModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  useEffect(() => {
    dispatch(getClasses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateTd = ({ day, hour }) => {
    const classToShow = classes.find(
      (theClass) => theClass?.day === day && theClass?.hour === hour
    );
    const mySubs = subs.filter((subscription) => subscription.memberId?._id === user?._id);
    const subscribedClass = mySubs.some((sub) => sub.classId?._id === classToShow?._id);
    const actualSub = subs.find((sub) => sub.classId?._id === classToShow?._id);
    if (subscribedClass) {
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
    } else if (classToShow) {
      return (
        <td
          key={`${day}-${hour}`}
          className={styles.whiteItem}
          onClick={() => {
            setSubscribeModal(!subscribeModal);
            setClassSelected(classToShow);
          }}
        >
          {classToShow?.activityId?.name}
        </td>
      );
    } else {
      return <td key={`${day}-${hour}`} className={styles.whiteItem}></td>;
    }
  };

  return (
    <section className={styles.container}>
      <Modal
        isOpen={successModal}
        title={'Subscibed Successfully'}
        success
        onClose={() => setSuccessModal(!successModal)}
      />
      <Modal
        isOpen={successDeleteModal}
        title={'Unsubscibed Successfully'}
        success
        onClose={() => setSuccessDeleteModal(!successDeleteModal)}
      />
      <Modal
        title={'Subscribe to Class'}
        text={
          <>
            {classSelected?.activityId?.name}
            <br></br>
            {classSelected?.day} {classSelected?.hour}
            <br></br>
            {classSelected?.trainerId?.firstName}{' '}
          </>
        }
        isOpen={subscribeModal}
        onClose={() => {
          setSubscribeModal(!subscribeModal);
        }}
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
            {classSelected?.trainerId?.firstName}{' '}
          </>
        }
        isOpen={unsubscribeModal}
        onClose={() => {
          setUnsubscribeModal(!unsubscribeModal);
        }}
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
        />
      </Modal>
      <table className={styles.table}>
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
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td className={styles.blueItem}>{hour}</td>
              {days.map((day) => generateTd({ day, hour }))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Schedule;
