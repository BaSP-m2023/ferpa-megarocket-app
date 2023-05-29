import { useEffect, useState } from 'react';
import styles from './activities.module.css';
import deleteIcon from './assets/delete.png';
import editIcon from './assets/edit.png';

// import deleteIcon from '../../../public/assets/images/delete.png';
// import editIcon from '.../../../public/assets/images/edit.png';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentName, setCurrentName] = useState('');
  const [currentDes, setCurrentDes] = useState('');
  const [currentId, setCurrentId] = useState('');

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
        return response.json();
      })
      .then((response) => {
        setActivities([...activities, response.data]);
      });
  };
  const onEdit = async (id) => {
    const index = activities.findIndex((activity) => activity._id === id);
    try {
      const res = await fetch(`${process.env.REACT_APP_API}/api/activities/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: currentName,
          description: currentDes,
          isActive: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      const update = [...activities];
      update[index] = data.data;
      console.log(update);
      console.log(update[index]);
      setActivities(update);
    } catch (error) {
      console.log(error);
    }
  };

  const getActivities = () => {
    fetch(`${process.env.REACT_APP_API}/api/activities/`)
      .then((response) => response.json())
      .then((response) => {
        setActivities(response.data);
      });
  };
  useEffect(() => {
    getActivities();
  }, []);

  return (
    <section className={styles.container}>
      <div>
        <h2>Activities</h2>
        <div className={styles.tableCloth}>
          {activities.map((activity) => {
            return (
              <table key={activity?._id}>
                <tbody>
                  <tr>
                    <th className={styles.activity}>Activity</th>
                    <th className={styles.description}>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                  <tr>
                    <td className={styles.activity}>{activity?.name}</td>
                    <td className={styles.description}>{activity?.description}</td>
                    <td className={styles.icon}>
                      <img
                        src={editIcon}
                        onClick={() => {
                          setShowEdit(!showEdit);
                          setCurrentName(activity.name);
                          setCurrentDes(activity.description);
                          setCurrentId(activity._id);
                        }}
                      />
                    </td>
                    <td className={styles.icon}>
                      <img
                        src={deleteIcon}
                        onClick={() => {
                          if (confirm('Are you sure you want to delete?')) {
                            alert('Activity deleted');
                            onDelete(activity._id);
                          }
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })}
          <button
            className={styles.add}
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
              <button className={styles.confirmAdd} type="submit">
                Add
              </button>
            </form>
          )}
          {showEdit && (
            <form className={styles.form} onSubmit={onSubmit}>
              <input
                type="text"
                placeholder={currentName}
                value={currentName}
                onChange={(e) => setCurrentName(e.target.value)}
              />
              <textarea
                type="text"
                placeholder={currentDes}
                value={currentDes}
                onChange={(e) => setCurrentDes(e.target.value)}
              />
              <button type="submit" onClick={() => onEdit(currentId)}>
                Edit
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Activities;
