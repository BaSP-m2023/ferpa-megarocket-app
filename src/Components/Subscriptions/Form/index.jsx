import React from 'react';
import styles from './form.module.css';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Select, DatePicker } from '../../Shared/Inputs';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';

const Form = () => {
  const { id } = useParams();
  const [members, setMembers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [currentSub, setCurrentSub] = useState({ classId: '', memberId: '', date: '' });
  const [modalError, setModalError] = useState(false);
  const [modalErrorText, setModalErrorText] = useState('');
  const [values, setValues] = useState({ member: '', activity: '' });
  const history = useHistory();

  const onRedirect = {
    pathname: '/subscriptions',
    state: { message: '' }
  };

  const selectActivities = classes.map((obj) => {
    return { _id: obj._id, name: `${obj.activityId?.name}, ${obj.day}, ${obj.hour} hrs` };
  });

  const selectMembers = members.map((obj) => {
    return { _id: obj._id, name: `${obj.lastName}, ${obj.firstName}` };
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

  const getSubscription = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`);
      const { data } = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const createSub = async () => {
    console.log(currentSub);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/`, {
        method: 'POST',
        body: JSON.stringify(currentSub),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (!data.error) {
        onRedirect.state.message = data.message;
        history.push(onRedirect);
      } else {
        setModalErrorText(data.message);
        setModalError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editSub = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
        method: 'PUT',
        body: JSON.stringify(currentSub),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (!data.error) {
        onRedirect.state.message = data.message;
        history.push(onRedirect);
      } else {
        setModalErrorText(data.message);
        setModalError(true);
        console.log(data);
      }
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
        console.log(editSub);
        setValues({
          member: `${editSub.memberId.lastName}, ${editSub.memberId.firstName}`,
          activity: `${editSub.classId.activityId?.name}, ${editSub.classId.day}, ${editSub.classId.hour} hrs`
        });
      };
      getSub();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    id ? editSub(id) : createSub();
  };

  const handleDatePicker = (dateValue) => {
    setCurrentSub((prev) => ({ ...prev, date: dateValue }));
  };

  return (
    <section className={styles.container}>
      <Modal
        isOpen={modalError}
        warning
        title={'ERROR'}
        text={modalErrorText}
        onClose={() => setModalError(!modalError)}
      >
        <Button variant={'white'} text={'Accept'} clickAction={() => setModalError(!modalError)} />
      </Modal>
      <form className={styles.form}>
        <h2 className={styles.formTitle}>{id ? 'EDIT SUBSCRIPTION' : 'ADD SUBSCRIPTION'}</h2>
        <div className={styles.inputBox}>
          <Select
            dark
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
            dark
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
          <DatePicker dark label={'Date'} value={currentSub.date} onChangeDate={handleDatePicker} />
        </div>
        <div className={styles.formBtns}>
          <Button
            variant={'add'}
            text={id ? 'Edit' : 'Add'}
            clickAction={(e) => {
              e.preventDefault();
              handleClick();
            }}
          />
          <Link to={'/subscriptions'}>
            <Button variant={'white'} text={'Cancel'} />
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Form;
