import { useEffect, useState } from 'react';
import styles from './activities.module.css';
import deleteIcon from './assets/delete-icon.png';
import editIcon from './assets/edit-icon.png';

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
    onAdd({ name, description });
    setName('');
    setDescription('');
  };
  const onDelete = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      setActivities([...activities.filter((activity) => activity._id !== id)]);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const onAdd = async ({ name, description }) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/`, {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          description: description,
          isActive: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      setActivities([...activities, data.data]);
    } catch (error) {
      console.error(error);
    }
  };
  const onEdit = async (id) => {
    const index = activities.findIndex((activity) => activity._id === id);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
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
      console.log(update[index]);
      setActivities(update);
    } catch (error) {
      console.error(error);
    }
  };
  const getActivities = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/`);
      const data = await res.json();
      setActivities(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getActivities();
  }, []);

  return (
    <section className={styles.container}>
      <div>
        <h2 className={styles.h2}>Activities</h2>
        <div className={styles.tableCloth}>
          {activities.map((activity) => {
            return (
              <table className={styles.table} key={activity?._id}>
                <tbody className={styles.tbody}>
                  <th className={`${styles.activity} ${styles.th}`}>Activity</th>
                  <th className={`${styles.description} ${styles.th}`}>Description</th>
                  <th className={styles.th}>Edit</th>
                  <th className={styles.th}>Delete</th>
                  <tr>
                    <td className={styles.activity}>{activity?.name}</td>
                    <td className={styles.description}>{activity?.description}</td>
                    <td className={styles.icon}>
                      <img
                        src={editIcon}
                        alt={'Edit'}
                        onClick={() => {
                          setShowEdit(!showEdit);
                          setShowAdd(false);
                          setCurrentName(activity.name);
                          setCurrentDes(activity.description);
                          setCurrentId(activity._id);
                        }}
                      />
                    </td>
                    <td className={styles.icon}>
                      <img
                        src={deleteIcon}
                        alt={'Delete'}
                        onClick={() => {
                          // eslint-disable-next-line no-restricted-globals
                          const uShureM8 = confirm({ message: 'Are you sure you want to delete?' });
                          if (uShureM8) {
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
              setShowEdit(false);
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
              <button
                className={styles.confirmEdit}
                type="submit"
                onClick={() => {
                  onEdit(currentId);
                  setShowEdit(!showEdit);
                }}
              >
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
