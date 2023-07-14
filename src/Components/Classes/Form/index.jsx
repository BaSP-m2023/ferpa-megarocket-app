import { useState, useEffect } from 'react';
import { Select } from 'Components/Shared/Inputs';
import { useParams, useHistory } from 'react-router-dom';
import { postClass, putClass } from 'redux/classes/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { getClasses } from 'redux/classes/thunks';
import { getActivities } from 'redux/activities/thunks';
import { getTrainers } from 'redux/trainers/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import styles from '../classes.module.css';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Loader from 'Components/Shared/Loader';

const Form = () => {
  const { classes, isLoading, serverMessage, success, error } = useSelector(
    (state) => state.classes
  );
  const { trainers } = useSelector((state) => state.trainers);
  const { data } = useSelector((state) => state.activities);
  const { id } = useParams();
  const [singleClass, setSingleClass] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [newClass, setNewClass] = useState({
    day: '',
    hour: '',
    activityId: '',
    trainerId: ''
  });
  const schema = Joi.object({
    day: Joi.string().valid(
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ),
    hour: Joi.string()
      .pattern(/^((0[9]|1[0-9]|2[01]):00)$/)
      .messages({
        'string.pattern.base': "The schedule must be from 9:00  to 21:00  o'clock."
      }),
    trainerId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    activityId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields }
  } = useForm({ mode: 'onChange', resolver: joiResolver(schema), defaultValues: { newClass } });

  const isFormEdited = Object.keys(dirtyFields).length > 0;

  const dispatch = useDispatch();
  const history = useHistory();
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
      value: '09:00'
    },
    {
      _id: 2,
      name: '10hs',
      value: '10:00'
    },
    {
      _id: 3,
      name: '11hs',
      value: '11:00'
    },
    {
      _id: 4,
      name: '12hs',
      value: '12:00'
    },
    {
      _id: 5,
      name: '13hs',
      value: '13:00'
    },
    {
      _id: 6,
      name: '14hs',
      value: '14:00'
    },
    {
      _id: 7,
      name: '15hs',
      value: '15:00'
    },
    {
      _id: 8,
      name: '16hs',
      value: '16:00'
    },
    {
      _id: 9,
      name: '17hs',
      value: '17:00'
    },
    {
      _id: 10,
      name: '18hs',
      value: '18:00'
    },
    {
      _id: 11,
      name: '19hs',
      value: '19:00'
    },
    {
      _id: 12,
      name: '20hs',
      value: '20:00'
    },
    {
      _id: 13,
      name: '21hs',
      value: '21:00'
    }
  ];

  const updatedTrainers = trainers.map((trainer) => {
    return { ...trainer, name: trainer.firstName, value: trainer._id };
  });
  const updatedActivity = data.map((activity) => {
    return { ...activity, name: activity.name, value: activity._id };
  });
  const getClassById = async () => {
    try {
      const classWithId = classes.find((element) => element._id === id);
      /*       const res = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${id}`);
      const data = await res.json(); */
      setSingleClass(classWithId);
      console.log(classWithId);
      previousClass(singleClass);
    } catch (error) {
      console.error(error);
    }
  };

  const previousClass = (singleClass) => {
    id &&
      setNewClass({
        ...newClass,
        day: singleClass.day,
        hour: singleClass.hour,
        activityId: singleClass.activityId?._id,
        trainerId: singleClass.trainerId?._id
      });
  };

  useEffect(() => {
    reset(newClass);
  }, [newClass, reset]);

  useEffect(() => {
    if (success) {
      history.push('/admin/classes');
    }
    if (error) {
      setShowErrorModal(true);
      setTimeout(() => {
        setShowErrorModal(false);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, error]);

  const onSubmit = (data) => {
    if (!isFormEdited) {
      history.goBack();
      return;
    }
    if (id) {
      dispatch(putClass(id, data));
    } else {
      dispatch(postClass(data));
    }
  };
  useEffect(() => {
    getActivities(dispatch);
    getClasses(dispatch);
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
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          data-testid={'class-add-edit-container'}
        >
          <h2>{id ? 'Edit' : 'Add'}</h2>
          {showErrorModal && (
            <Modal
              title={serverMessage}
              isOpen={showErrorModal}
              warning
              onClose={() => setShowErrorModal(false)}
              testid={'confirm-modal'}
            />
          )}
          <div className={styles.sideBySideContainer}>
            <Select
              register={register}
              placeholder={id ? singleClass.day : 'Day'}
              options={weekDays}
              nameValue={'day'}
              error={errors.day?.message}
              label={'Day'}
            />
            <Select
              register={register}
              placeholder={id ? singleClass?.hour : 'Hour'}
              options={hours}
              nameValue={'hour'}
              error={errors.hour?.message}
              label={'Hour'}
            />
            <Select
              register={register}
              placeholder={id ? singleClass.trainerId?.firstName : 'Trainer'}
              options={updatedTrainers}
              nameValue={'trainerId'}
              error={errors.trainerId?.message}
              label={'Trainer'}
            />
            <Select
              register={register}
              placeholder={id ? singleClass.activityId?.name : 'Activity'}
              options={updatedActivity}
              nameValue={'activityId'}
              error={errors.activityId?.message}
              label={'Activity'}
            />
          </div>
          <div className={styles.selectContainer}>
            <div className={styles.buttons}>
              <Button
                variant={'white'}
                text={'Cancel'}
                clickAction={() => history.push('/admin/classes')}
                testid={'cancel-btn'}
              />
              <Button
                variant={'add'}
                text={id ? 'Edit' : 'Add'}
                submitting
                testid={'add-edit-btn'}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
