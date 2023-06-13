import { useState, useEffect } from 'react';
import styles from '../classes.module.css';
import { Select } from '../../Shared/Inputs/index';
import Button from '../../Shared/Button/index';
import { useParams, useHistory } from 'react-router-dom';
import Modal from '../../Shared/Modal';
import { postClass, putClass } from '../../../redux/classes/thunks';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Loader from '../../Shared/Loader/';
import { getActivities } from '../../../redux/activities/thunks';
import { getTrainers } from '../../../redux/trainers/thunks';

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [singleClass, setSingleClass] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
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
      value: 9
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
  const slots = [
    {
      _id: 1,
      name: '1',
      value: 1
    },
    {
      _id: 2,
      name: '2',
      value: 2
    },
    {
      _id: 3,
      name: '3',
      value: 3
    },
    {
      _id: 4,
      name: '4',
      value: 4
    },
    {
      _id: 5,
      name: '5',
      value: 5
    },
    {
      _id: 6,
      name: '6',
      value: 6
    },
    {
      _id: 7,
      name: '7',
      value: 7
    },
    {
      _id: 8,
      name: '8',
      value: 8
    },
    {
      _id: 9,
      name: '9',
      value: 9
    },
    {
      _id: 10,
      name: '10',
      value: 10
    },
    {
      _id: 11,
      name: '11',
      value: 11
    },
    {
      _id: 12,
      name: '12',
      value: 12
    },
    {
      _id: 13,
      name: '13',
      value: 13
    },
    {
      _id: 14,
      name: '14',
      value: 14
    },
    {
      _id: 15,
      name: '15',
      value: 15
    },
    {
      _id: 16,
      name: '16',
      value: 16
    },
    {
      _id: 17,
      name: '17',
      value: 17
    },
    {
      _id: 18,
      name: '18',
      value: 18
    },
    {
      _id: 19,
      name: '19',
      value: 19
    },
    {
      _id: 20,
      name: '20',
      value: 20
    }
  ];

  const { isLoading, serverMessage, success, error } = useSelector((state) => state.classes);
  const { trainers } = useSelector((state) => state.trainers);
  const { data } = useSelector((state) => state.activities);

  const updatedTrainers = trainers.map((trainer) => {
    return { ...trainer, name: trainer.firstName, value: trainer._id };
  });
  const updatedActivity = data.map((activity) => {
    return { ...activity, name: activity.name, value: activity._id };
  });
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

  const onChangeInput = (e) => {
    setNewClass({
      ...newClass,
      [e.target.name]: e.target.value
    });
  };

  const previousClass = (singleClass) => {
    id &&
      setNewClass({
        ...newClass,
        day: singleClass.day,
        hour: singleClass.hour,
        activityId: singleClass.activityId._id,
        trainerId: singleClass.trainerId._id,
        slots: singleClass.slots
      });
  };

  useEffect(() => {
    if (success) {
      history.push('/classes');
    }
    if (error) {
      setShowErrorModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, error]);

  const sendClass = () => {
    if (id) {
      dispatch(putClass(id, newClass));
    } else {
      dispatch(postClass(newClass));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    getActivities(dispatch);
    getTrainers(dispatch);
    id && getClassById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Object.keys(singleClass).length > 0) {
      previousClass(singleClass);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleClass]);
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.transparetnBlueForm}>
          <div className={styles.loading}>{<Loader />}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.transparetnBlueForm}>
        <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
          <h2>{id ? 'Edit' : 'Add'}</h2>
          {showSuccessModal && (
            <Modal
              title={id ? 'Class Updated' : serverMessage}
              isOpen
              success
              onClose={() => {
                setShowSuccessModal(false);
              }}
            />
          )}
          {showErrorModal && (
            <Modal
              title={serverMessage}
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
            value={hours.hour}
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
          <Select
            value={slots.slot}
            placeholder={id ? singleClass.slots : 'Slots'}
            onChangeSelect={(e) => onChangeInput(e)}
            options={slots}
            nameValue={'slots'}
          />
          <div className={styles.buttons}>
            <Button
              variant={'add'}
              text={id ? 'Edit' : 'Add'}
              submitting
              clickAction={() => {
                sendClass();
              }}
            />
            <Button
              variant={'white'}
              text={'Cancel'}
              submitting
              clickAction={() => history.push('/classes')}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
