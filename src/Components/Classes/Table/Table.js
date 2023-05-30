import React from 'react';

const Table = ({ data, deleteItem }) => {
  return (
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
              <td></td>
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
  );
};

export default Table;
