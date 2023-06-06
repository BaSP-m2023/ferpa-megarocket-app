import { useState } from 'react';
import styles from '../classes.module.css';

const Form = ({ onSubmit, activities, trainers, text, readyToSendAndAdd, readyToSendAndEdit }) => {
  const [newClass, setNewClass] = useState({
    day: '',
    hour: '',
    activityId: '',
    trainerId: '',
    slots: ''
  });
  const onChangeInput = (e) => {
    setNewClass({
      ...newClass,
      [e.target.name]: e.target.value
    });
  };
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2>{text}</h2>
      <select name="day" value={newClass.day} onChange={(e) => onChangeInput(e)}>
        <option disabled value="">
          Day
        </option>
        <option value={'Monday'}>Monday</option>
        <option value={'Tuesday'}>Tuesday</option>
        <option value={'Wednesday'}>Wednesday</option>
        <option value={'Thursday'}>Thursday</option>
        <option value={'Friday'}>Friday</option>
        <option value={'Saturday'}>Saturday</option>
        <option value={'Sunday'}>Sunday</option>
      </select>
      <select name="hour" value={newClass.hour} onChange={(e) => onChangeInput(e)}>
        <option disabled value="">
          Hour
        </option>
        <option value={'9'}>09hs</option>
        <option value={'10'}>10hs</option>
        <option value={'11'}>11hs</option>
        <option value={'12'}>12hs</option>
        <option value={'13'}>13hs</option>
        <option value={'14'}>14hs</option>
        <option value={'15'}>15hs</option>
        <option value={'16'}>16hs</option>
        <option value={'17'}>17hs</option>
        <option value={'18'}>18hs</option>
        <option value={'19'}>19hs</option>
        <option value={'20'}>20hs</option>
        <option value={'21'}>21hs</option>
      </select>
      <select
        name="activityId"
        value={newClass.activityId}
        onChange={(e) => {
          onChangeInput(e);
        }}
      >
        <option disabled value="">
          Activity
        </option>
        {activities.map((activity) => {
          return (
            <option key={activity._id} value={activity._id}>
              {activity.name}
            </option>
          );
        })}
      </select>
      <select
        name="trainerId"
        value={newClass.trainerId}
        onChange={(e) => {
          onChangeInput(e);
        }}
      >
        <option disabled value="">
          Trainer
        </option>
        {trainers.map((trainer) => {
          return (
            <option key={trainer._id} value={trainer._id}>
              {trainer.firstName}
            </option>
          );
        })}
      </select>
      <input
        name="slots"
        type="number"
        value={newClass.slots}
        onChange={(e) => onChangeInput(e)}
        placeholder="Slots"
      />
      <button
        type="submit"
        onClick={() => {
          readyToSendAndAdd && readyToSendAndAdd(newClass);
          readyToSendAndEdit && readyToSendAndEdit(newClass);
        }}
      >
        {text}
      </button>
    </form>
  );
};

export default Form;
