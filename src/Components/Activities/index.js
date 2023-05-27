import { useEffect, useState } from 'react';
import styles from './activities.module.css';
import deleteIcon from './assets/delete.png';
import editIcon from './assets/edit.png';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    onClick({ name, description });
    setName('');
    setDescription('');
  };
  const onDelete = (id) => {
    fetch(`${process.env.REACT_APP_API}/api/activities/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        return response.json();
      })
      .then(() => {
        setActivities([...activities.filter((activity) => activity._id !== id)]);
      });
  };

  const onClick = ({ name, description }) => {
    fetch(`${process.env.REACT_APP_API}/api/activities/`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        description: description,
        isActive: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response.body);
        return response.json();
      })
      .then((response) => {
        setActivities([...activities, response.data]);
      });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/api/activities/`)
      .then((response) => response.json())
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Activities</h2>
      <button
        onClick={() => {
          setShowAdd(!showAdd);
        }}
      >
        Add
      </button>
      {showAdd && (
        <form className={styles.form} onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Activity name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            type="text"
            placeholder="Activity description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit">Add</button>
        </form>
      )}
      {showEdit && (
        <form className={styles.form} onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Activity name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            type="text"
            placeholder="Activity description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit">Edit</button>
        </form>
      )}
      <div>
        {activities.map((activity) => {
          return (
            <table key={activity._id}>
              <tbody>
                <tr>
                  <th>Activity</th>
                  <th>Description</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
                <tr>
                  <td>{activity.name}</td>
                  <td>{activity.description}</td>
                  <td>
                    <img
                      src={editIcon}
                      onClick={() => {
                        setShowEdit(!showEdit);
                      }}
                    />
                  </td>
                  <td>
                    <img src={deleteIcon} onClick={() => onDelete(activity._id)} />
                  </td>
                </tr>
              </tbody>
            </table>
          );
        })}
      </div>
    </section>
  );
}

export default Activities;
