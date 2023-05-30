import { useState } from 'react';

const Form = ({ onAddItem, activities, trainers }) => {
  const [klass, setKlass] = useState({
    day: '',
    hour: '',
    activityId: '',
    trainerId: '',
    slots: ''
  });

  const onChangeInput = (e) => {
    setKlass({
      ...klass,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onAddItem(klass);
    console.log(klass);
    setKlass({
      day: '',
      hour: '',
      activityId: '',
      trainerId: '',
      slots: ''
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <div className="input container">
          <label>Day</label>
          <input name="day" type="text" value={klass.day} onChange={onChangeInput} />
        </div>
        <div className="input container">
          <label>Hour</label>
          <input name="hour" type="number" value={klass.hour} onChange={onChangeInput} />
        </div>
      </div>
      <div className="input container">
        <label>Activity Name</label>
        <select name="activityId" value={klass.activityId} onChange={onChangeInput}>
          {activities.map((activity) => {
            return (
              <option key={activity._id} value={activity._id}>
                {activity.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="input container">
        <label>Trainer</label>
        <select name="trainerId" value={klass.trainerId} onChange={onChangeInput}>
          {trainers.map((trainer) => {
            return (
              <option key={trainer._id} value={trainer._id}>
                {trainer.firstName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="input container">
        <label>Slots</label>
        <input name="slots" type="number" value={klass.slots} onChange={onChangeInput} />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
