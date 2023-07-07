import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses } from 'redux/classes/thunks';
import styles from './schedule.module.css';
import Modal from 'Components/Shared/Modal';
import Button from '../Shared/Button/index';

const Schedule = () => {
  const dispatch = useDispatch();
  const { classes } = useSelector((state) => state.classes);
  const [classSelected, setClassSelected] = useState({});
  const [subscribeModal, setSubscribeModal] = useState(false);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hours = [];
  for (let i = 9; i <= 21; i++) {
    hours.push(i.toString().padStart(2, '0') + ':00');
  }

  useEffect(() => {
    dispatch(getClasses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateTd = ({ day, hour }) => {
    const classToShow = classes.find(
      (theClass) => theClass?.day === day && theClass?.hour === hour
    );
    if (classToShow) {
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
        <Button text={'Subscribe'} type={'button'} variant={'add'} />
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
