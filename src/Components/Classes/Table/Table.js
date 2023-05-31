import React from 'react';
import { useState } from 'react';

const Table = ({ data, deleteItem, onEditItem, activities, trainers }) => {
  const [klass, setKlass] = useState({
    _id: '',
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

  const funcionCargaDatos = (item) => {
    setKlass({
      _id: item._id,
      day: item.day,
      hour: item.hour,
      activityId: item.activityId,
      trainerId: item.trainerId,
      slots: item.slots
    });
    console.log(item);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onEditItem(klass._id, klass);
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
    <div>
      <table>
        <thead>
          <tr>
            <th>Activity Name</th>
            <th>day</th>
            <th>hour</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item._id}>
                {item.activityId.name ? <td>{item.activityId.name}</td> : <td>Undefined</td>}
                <td>{item.day}</td>
                <td>{item.hour}</td>
                <td>{item.slots}</td>
                <td></td>
                <td>
                  <button className="editButton" onClick={() => funcionCargaDatos(item)}>
                    Edit Item
                  </button>
                </td>
                <td>
                  <button className="deleteButton" onClick={() => deleteItem(item._id)}>
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <form onSubmit={onSubmit}>
        <h3> Edit Form! </h3>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Table;
