import React from 'react';
import styles from './subscriptions.module.css';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Select, DatePicker } from '../Shared/Inputs';
import Button from '../Shared/Button';

const Form = () => {
  const { id } = useParams();
  const [members, setMembers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [currentSub, setCurrentSub] = useState({ classId: '', memberId: '', date: '' });

  const history = useHistory();

  const selectActivities = classes.map((obj) => {
    return { _id: obj._id, name: obj.activityId.name };
  });

  const selectMembers = members.map((obj) => {
    return { _id: obj._id, name: `${obj.lastName}, ${obj.firstName}` };
  });

  const getMembers = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/members/`);
      const { data } = await res.json();
      setMembers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getClasses = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/`);
      const { data } = await res.json();
      setClasses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createSub = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/`, {
        method: 'POST',
        body: JSON.stringify(currentSub),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      history.push('/subscriptions');
    } catch (error) {
      console.error(error);
    }
  };

  const getSubscription = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`);
      const { data } = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMembers();
    getClasses();
    if (id) {
      const getSub = async () => {
        const editSub = await getSubscription(id);
        setCurrentSub({
          memberId: editSub.memberId._id,
          classId: editSub.classId._id,
          date: editSub.date.slice(0, 10)
        });
      };
      getSub();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    console.log(currentSub);
    createSub();
  };

  const handleDatePicker = (dateValue) => {
    setCurrentSub((prev) => ({ ...prev, date: dateValue }));
  };

  return (
    <section className={styles.container}>
      <form className={styles.list}>
        <div className={styles.inputBox}>
          <Select
            placeholder={'Select'}
            label={'Member'}
            options={selectMembers}
            value={currentSub.memberId}
            onChangeSelect={(e) => {
              setCurrentSub((prev) => ({ ...prev, memberId: e.target.value }));
            }}
          />
        </div>
        <div className={styles.inputBox}>
          <Select
            placeholder={'Select'}
            label={'Activity'}
            options={selectActivities}
            value={currentSub.classId}
            onChangeSelect={(e) => {
              setCurrentSub((prev) => ({ ...prev, classId: e.target.value }));
            }}
          />
        </div>
        <div className={styles.inputBox}>
          <DatePicker label={'Date'} value={currentSub.date} onChangeDate={handleDatePicker} />
        </div>

        <Button
          type={'add'}
          text={'Add'}
          clickAction={(e) => {
            e.preventDefault();
            handleClick();
          }}
        />

        <Link to={'/subscriptions'}>
          <Button type={'white'} text={'Cancel'} />
        </Link>
      </form>
    </section>
  );
};

export default Form;
