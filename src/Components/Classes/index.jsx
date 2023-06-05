import { useEffect, useState } from 'react';
import styles from './classes.module.css';
import Form from './Form/index';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [activities, setActivities] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [readyToSendAndAdd, setReadyToSendAndAdd] = useState({
    day: '',
    hour: '',
    activityId: '',
    trainerId: '',
    slots: ''
  });
  const [readyToSendAndEdit, setReadyToSendAndEdit] = useState({
    day: '',
    hour: '',
    activityId: '',
    trainerId: '',
    slots: ''
  });
  const [currentId, setCurrentId] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    getClasses();
    getActivities();
    getTrainers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getClasses = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/`);
      const data = await res.json();
      setClasses(data.data);
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

  const getTrainers = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/`);
      const data = await res.json();
      setTrainers(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addClass = async (readyToSendAndAdd) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/`, {
        method: 'POST',
        body: JSON.stringify(readyToSendAndAdd),
        headers: {
          'Content-type': 'application/json'
        }
      });
      const data = await res.json();
      setClasses([...classes, data.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteClass = async (_id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${_id}`, {
      method: 'DELETE'
    });
    const justOne = classes.filter((justOne) => justOne._id === _id);
    alert(`${justOne[0].activityId.name} Class was deleted`);
    setClasses([...classes.filter((justOne) => justOne._id !== _id)]);
  };

  const updateClass = async (currentId, readyToSendAndEdit) => {
    const index = classes.findIndex((singleClass) => singleClass._id === currentId);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${currentId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(readyToSendAndEdit)
      });
      const data = await res.json();
      const updatedClasses = [...classes];
      updatedClasses[index] = data.data;
      setClasses(updatedClasses);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitToAdd = (e) => {
    e.preventDefault();
    addClass(readyToSendAndAdd);
  };
  const onSubmitToEdit = (e) => {
    e.preventDefault();
    updateClass(currentId, readyToSendAndEdit);
  };

  return (
    <section className={styles.container}>
      <div className={styles.transparetnBlue}>
        <h2>Classes</h2>
        <div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.large}>Activity Name</th>
                <th className={styles.medium}>Day</th>
                <th className={styles.small}>Hour</th>
                <th className={styles.medium}>Trainer</th>
                <th className={styles.small}>Slots</th>
                <th className={styles.small}>Edit</th>
                <th className={styles.small}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((theOne) => {
                return (
                  <tr key={theOne?._id}>
                    <td className={styles.large}>{theOne?.activityId?.name}</td>
                    <td className={styles.medium}>{theOne?.day}</td>
                    <td className={styles.small}>{theOne?.hour}</td>
                    <td className={styles.medium}>{theOne?.trainerId?.firstName}</td>
                    <td className={styles.small}>{theOne?.slots}</td>
                    <td className={styles.small}>
                      <button
                        onClick={() => {
                          setCurrentId(theOne._id);
                          setShowEdit(!showEdit);
                          setShowAdd(false);
                        }}
                      >
                        Edit Item
                      </button>
                    </td>
                    <td>
                      <button
                        className="deleteButton"
                        onClick={() => {
                          // eslint-disable-next-line no-restricted-globals
                          if (confirm('Are you sure?') === true) {
                            deleteClass(theOne?._id);
                          }
                        }}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
            <Form
              onSubmit={onSubmitToAdd}
              activities={activities}
              trainers={trainers}
              text={'Add'}
              readyToSendAndAdd={setReadyToSendAndAdd}
            />
          )}
          {showEdit && (
            <Form
              onSubmit={onSubmitToEdit}
              activities={activities}
              trainers={trainers}
              text={'Edit'}
              readyToSendAndEdit={setReadyToSendAndEdit}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Classes;
