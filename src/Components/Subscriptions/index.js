import { useEffect, useState } from 'react';
import styles from './subscriptions.module.css';

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [members, setMembers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [classId, setClassId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [date, setDate] = useState('');
  const [currentClassId, setCurrentClassId] = useState('');
  const [currentMemberId, setCurrentMemberId] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentId, setCurrentId] = useState('');

  const onDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      setSubscriptions(subscriptions.filter((subscription) => subscription._id !== id));
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getSubscriptions = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/all`);
      const { data } = await res.json();
      setSubscriptions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMembers = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/members/`);
      const { data } = await res.json();
      setMembers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getClasses = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/`);
      const { data } = await res.json();
      setClasses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onClick = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/`, {
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
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          classId: currentClassId,
          memberId: currentMemberId,
          date: currentDate
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      const updatedSubscription = {
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
      const update = [...subscriptions];
      update[index] = updatedSubscription;
      setSubscriptions(update);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSubscriptions();
    getMembers();
    getClasses();
  }, []);

  return (
    <section className={styles.container}>
      <section className={styles.list}>
        <header className={styles.header}>
          <h1 className={styles.title}>Subscriptions</h1>
          <button
            className={styles.btn}
            onClick={() => {
              setShowAdd(!showAdd);
              setShowEdit(false);
            }}
          >
            ADD Subs
          </button>
        </header>
        <table className={styles.table}>
          <tbody className={styles.tbody}>
            <tr className={styles.tr}>
              <th className={styles.thead}>Subscription</th>
              <th className={styles.thead}>Activity</th>
              <th className={styles.thead}>Member Last name</th>
              <th className={styles.thead}>Date</th>
            </tr>
            {subscriptions.map((subscription) => (
              <tr key={subscription._id} className={styles.tr}>
                <td className={styles.td}>{subscription._id}</td>
                <td className={styles.td}>{subscription.classId?.activityId?.name}</td>
                <td className={styles.td}>{subscription.memberId?.lastName}</td>
                <td className={styles.td}>{subscription.date.slice(0, 10)}</td>
                <td className={styles.td}>
                  <img
                    src="/assets/images/edit-icon.svg"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setShowEdit(!showEdit);
                      setShowAdd(false);
                      setCurrentClassId(subscription.classId?._id);
                      setCurrentMemberId(subscription.memberId?._id);
                      setCurrentDate(subscription.date.slice(0, 10));
                      setCurrentId(subscription._id);
                    }}
                  />
                </td>
                <td className={styles.td}>
                  <img
                    src="/assets/images/delete-icon.svg"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      const shureDelete = confirm('Are you sure you want to delete?');
                      if (shureDelete) {
                        alert('Subscription deleted');
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
              <label className={styles.label}>Class ID:</label>
              <select
                type="text"
                placeholder="class Id"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                required
              >
                <option value="">Seleccione una opción</option>
                {classes.map((item) => {
                  return (
                    <option key={item?._id} value={item?._id}>
                      {`${item?._id}, ${item?.activityId?.name}`}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.inputBox}>
              <label className={styles.label}>Member ID:</label>
              <select
                type="text"
                placeholder="Member Id"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                required
              >
                <option value="">Seleccione una opción</option>
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
              <label className={styles.label}>Date:</label>
              <input
                className={styles.submitBtn}
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <button className={styles.btnAdd} type="submit">
              Add Subs
            </button>
          </form>
        )}
        {showEdit && (
          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.inputBox}>
              <label className={styles.label}>Class ID:</label>
              <select
                type="text"
                placeholder={currentClassId}
                value={currentClassId}
                onChange={(e) => setCurrentClassId(e.target.value)}
                required
              >
                {classes.map((item) => {
                  return (
                    <option key={item?._id} value={item?._id}>
                      {`${item?._id}, ${item?.activityId?.name}`}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.inputBox}>
              <label className={styles.label}>Member ID:</label>
              <select
                type="text"
                placeholder={currentMemberId}
                value={currentMemberId}
                onChange={(e) => setCurrentMemberId(e.target.value)}
                required
              >
                {members.map((item) => {
                  return (
                    <option key={item?._id} value={item?._id}>
                      {`${item?.lastName}, ${item?.firstName}`}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.inputBox}>
              <label className={styles.label}>Date:</label>
              <input
                className={styles.submitBtn}
                type="date"
                name="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                required
              />
            </div>
            <button
              className={styles.btnEdit}
              type="submit"
              onClick={() => {
                onEdit(currentId);
                setShowEdit(!showEdit);
              }}
            >
              Edit Subs
            </button>
          </form>
        )}
      </section>
    </section>
  );
}

export default Subscriptions;
