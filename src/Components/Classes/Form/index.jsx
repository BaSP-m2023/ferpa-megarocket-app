import { useState, useEffect } from 'react';
import styles from '../classes.module.css';
import { Select, Input } from '../../Shared/Inputs/index';
import Button from '../../Shared/Button/index';
import { useParams, useHistory } from 'react-router-dom';
import Modal from '../../Shared/Modal';

const Form = () => {
  const history = useHistory();
  const { id } = useParams();
  const [activities, setActivities] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [singleClass, setSingleClass] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [newClass, setNewClass] = useState({
    day: '',
    hour: '',
    activityId: '',
    trainerId: '',
    slots: ''
  });
  const weekDays = [
    {
      _id: 1,
      name: 'Monday',
      value: 'Monday'
    },
    {
      _id: 2,
      name: 'Tuesday',
      value: 'Tuesday'
    },
    {
      _id: 3,
      name: 'Wednesday',
      value: 'Wednesday'
    },
    {
      _id: 4,
      name: 'Thursday',
      value: 'Thursday'
    },
    {
      _id: 5,
      name: 'Friday',
      value: 'Friday'
    },
    {
      _id: 6,
      name: 'Saturday',
      value: 'Saturday'
    },
    {
      _id: 7,
      name: 'Sunday',
      value: 'Sunday'
    }
  ];
  const hours = [
    {
      _id: 1,
      name: '9hs',
      value: 10
    },
    {
      _id: 2,
      name: '10hs',
      value: 10
    },
    {
      _id: 3,
      name: '11hs',
      value: 11
    },
    {
      _id: 4,
      name: '12hs',
      value: 12
    },
    {
      _id: 5,
      name: '13hs',
      value: 13
    },
    {
      _id: 6,
      name: '14hs',
      value: 14
    },
    {
      _id: 7,
      name: '15hs',
      value: 15
    },
    {
      _id: 8,
      name: '16hs',
      value: 16
    },
    {
      _id: 9,
      name: '17hs',
      value: 17
    },
    {
      _id: 10,
      name: '18hs',
      value: 18
    },
    {
      _id: 11,
      name: '19hs',
      value: 19
    },
    {
      _id: 12,
      name: '20hs',
      value: 20
    },
    {
      _id: 13,
      name: '21hs',
      value: 21
    }
  ];

  const updatedTrainers = trainers.map((trainer) => {
    return { ...trainer, name: trainer.firstName, value: trainer._id };
  });
  const updatedActivity = activities.map((activity) => {
    return { ...activity, name: activity.name, value: activity._id };
  });

  const getActivities = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/`);
      const data = await res.json();
      setActivities(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getTrainers = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/`);
      const data = await res.json();
      setTrainers(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getClassById = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${id}`);
      const data = await res.json();
      setSingleClass(data.data);
      previousClass(singleClass);
    } catch (error) {
      console.error(error);
    }
  };

  const addClass = async (newClass) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/`, {
        method: 'POST',
        body: JSON.stringify(newClass),
        headers: {
          'Content-type': 'application/json'
        }
      });
      const data = await res.json();
      if (res.status === 201) {
        setSuccess(true);
        setShowSuccessModal(true);
      } else {
        setMessage(data.error._message);
        setSuccess(false);
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeInput = (e) => {
    setNewClass({
      ...newClass,
      [e.target.name]: e.target.value
    });
  };

  const updateClass = async (id, newClass) => {
    console.log(newClass);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(newClass)
      });
      const data = await res.json();
      console.log(res.status);
      if (res.status === 200) {
        setSuccess(true);
        setShowSuccessModal(true);
      } else {
        console.log(data);
        setMessage(data.error._message);
        setSuccess(false);
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const previousClass = (singleClass) => {
    console.log(singleClass);
    id &&
      setNewClass({
        ...newClass,
        day: singleClass.day,
        hour: singleClass.hour,
        activityId: singleClass.activityId._id,
        trainerId: singleClass.trainerId._id,
        slots: singleClass.slots
      });
    console.log(newClass);
    console.log(message);
  };

  const sendClass = () => {
    id ? updateClass(id, newClass) : addClass(newClass);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    getActivities();
    getTrainers();
    id && getClassById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Object.keys(singleClass).length > 0) {
      previousClass(singleClass);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleClass]);

  const reDirect = () => {
    success
      ? history.push('/classes')
      : id
      ? history.push(`/classes/form/${id}`)
      : history.push('/classes/form/');
  };
  const back = () => {
    history.push('/classes');
  };
  return (
    <div className={styles.container}>
      <div className={styles.transparetnBlue}>
        <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
          <h2>{id ? 'Edit' : 'Add'}</h2>
          {showSuccessModal && (
            <Modal text={id ? 'Class Updated' : 'Class Added'} isOpen success onClose={reDirect} />
          )}
          {showErrorModal && (
            <Modal
              text={message}
              isOpen={showErrorModal}
              warning
              onClose={() => setShowErrorModal(false)}
            />
          )}
          <Select
            value={weekDays.day}
            placeholder={id ? singleClass.day : 'Day'}
            onChangeSelect={(e) => onChangeInput(e)}
            options={weekDays}
            nameValue={'day'}
          />
          <Select
            value={hours.day}
            placeholder={id ? singleClass.hour : 'Hour'}
            onChangeSelect={(e) => onChangeInput(e)}
            options={hours}
            nameValue={'hour'}
          />
          <Select
            value={newClass.activityId}
            placeholder={id ? singleClass.activityId?.name : 'Activity'}
            onChangeSelect={(e) => onChangeInput(e)}
            options={updatedActivity}
            nameValue={'activityId'}
          />
          <Select
            value={newClass.trainerId}
            placeholder={id ? singleClass.trainerId?.firstName : 'Trainer'}
            onChangeSelect={(e) => onChangeInput(e)}
            options={updatedTrainers}
            nameValue={'trainerId'}
          />
          <Input
            nameValue={'slots'}
            type={'text'}
            value={newClass.slots.value}
            onChangeInput={(e) => {
              e.target.value > 0
                ? onChangeInput(e)
                : setMessage('There has to be at least one slot');
            }}
            placeholder={id ? singleClass.slots : 'Slots'}
          />
          <div className={styles.buttons}>
            <Button variant={'add'} text={id ? 'Edit' : 'Add'} submitting clickAction={sendClass} />
            <Button variant={'white'} text={'Cancel'} submitting clickAction={back} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
