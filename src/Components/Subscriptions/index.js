import { useEffect, useState } from 'react';
import styles from './subscriptions.module.css';
import { FaPen, FaTrash } from 'react-icons/fa';

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [members, setMembers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [classId, setClassId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [date, setDate] = useState('');

  const onDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/subscriptions/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      setSubscriptions(subscriptions.filter((subscription) => subscription._id !== id));
      return data;
    } catch (error) {
      console.error;
    }
  };

  const getSubscriptions = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API}/api/subscriptions/all`);
      const { data } = await res.json();
      setSubscriptions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMembers = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API}/api/members/`);
      const { data } = await res.json();
      setMembers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getClasses = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API}/api/classes/`);
      const { data } = await res.json();
      setClasses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onClick = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API}/api/subscriptions/`, {
        method: 'POST',
        body: JSON.stringify({
          classId: classId,
          memberId: memberId,
          date: date
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      console.log('prueba data', data);

      const newSubscription = {
        _id: data.data._id,
        classId: {
          activityId: {
            name: classes.find((item) => item._id === data.data.classId).activityId?.name
          }
        },
        memberId: {
          lastName: members.find((item) => item._id === data.data.memberId).lastName
        },
        date: data.data.date
      };

      setSubscriptions([...subscriptions, newSubscription]);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onClick();
    setClassId('');
    setMemberId('');
  };

  const onEdit = async (id) => {
    const index = subscriptions.findIndex((subscription) => subscription._id === id);
    try {
      const res = await fetch(`${process.env.REACT_APP_API}/api/subscriptions/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          classId: classId,
          memberId: memberId,
          date: date
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      console.log('prueba data update', data);

      const updateSubscription = [...subscriptions];
      updateSubscription[index] = data.data;
      console.log(updateSubscription[index]);

      setSubscriptions(updateSubscription);
    } catch (error) {
      console.error;
    }
  };

  useEffect(() => {
    getSubscriptions();
    getMembers();
    getClasses();
  }, []);

  console.log('subs', subscriptions);
  console.log('classId', classId);
  console.log('memberId', memberId);

  return (
    <section className={styles.container}>
      <section className={styles.list}>
        <header className={styles.header}>
          <h1 className={styles.title}>Subscriptions</h1>
          <button
            className={styles.btn}
            onClick={() => {
              setShowAdd(!showAdd);
            }}
          >
            ADD Subs
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              setShowAdd(!showAdd);
            }}
          >
            EDIT Subs
          </button>
        </header>
        <table className={styles.table}>
          <tbody className={styles.tbody}>
            <tr className={styles.tr}>
              <th className={styles.thead}>Activity</th>
              <th className={styles.thead}>Member ID</th>
              <th className={styles.thead}>Date</th>
            </tr>
            {subscriptions.map((subscription) => (
              <tr key={subscription._id} className={styles.tr}>
                <td className={styles.td}>{subscription.classId?.activityId?.name}</td>
                <td className={styles.td}>{subscription.memberId?.lastName}</td>
                <td className={styles.td}>{subscription.date}</td>
                <td className={styles.td}>
                  <FaPen
                    style={{ color: 'white', cursor: 'pointer' }}
                    onClick={() => {
                      setShowEdit(!showEdit);
                      setShowAdd(false);
                      setCurrentName(activity.name);
                      setCurrentDes(activity.description);
                      setCurrentId(activity._id);
                    }}
                  />
                </td>
                <td className={styles.td}>
                  <FaTrash
                    style={{ color: 'white', cursor: 'pointer' }}
                    onClick={() => {
                      const shureDelete = confirm('Are you sure you want to delete?');
                      if (shureDelete) {
                        alert('Activity deleted');
                        onDelete(subscription._id);
                      }
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showAdd && (
          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.inputBox}>
              <label>Class ID:</label>
              <select
                type="text"
                placeholder="class Id"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                required
              >
                {classes.map((item) => {
                  return (
                    <option key={item?._id} value={item?._id}>
                      {`${item?._id}`}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.inputBox}>
              <label>Member ID:</label>
              <select
                type="text"
                placeholder="Member Id"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                required
              >
                {members.map((item) => {
                  return (
                    <option key={item?._id} value={item?._id}>
                      {`${item?.lastName}`}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.inputBox}>
              <label>Date:</label>
              <input
                className={styles.submitBtn}
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <button type="submit">Add Subs</button>
          </form>
        )}
      </section>
    </section>
  );
}

export default Subscriptions;
