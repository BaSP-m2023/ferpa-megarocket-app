// import { useEffect, useState } from 'react';
// import styles from './subscriptions.module.css';
// import List from './list';

// function Subscriptions() {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [classId, setClassId] = useState([]);
//   const [memberId, setMemberId] = useState([]);

//   useEffect(() => {
//     const getSubscriptions = async () => {
//       const subscriptions = await getAllSubscriptions();
//       console.log('Subscriptions:', subscriptions);
//       setSubscriptions(subscriptions);
//     };
//     getSubscriptions();
//     getClassID();
//     getMemberID();
//   }, []);

//   const getAllSubscriptions = async () => {
//     const res = await fetch(`${process.env.REACT_APP_API}/api/subscriptions/all`);
//     const { data } = await res.json();
//     return data;
//   };

//   const getClassID = async () => {
//     try {
//       const res = await fetch(`${process.env.REACT_APP_API}/api/classes`);
//       const data = await res.json();
//       setClassId(data.data);
//       console.log('Datos de classId:', data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getMemberID = async () => {
//     try {
//       const res = await fetch(`${process.env.REACT_APP_API}/api/members`);
//       const data = await res.json();
//       setMemberId(data.data);
//       console.log('Datos de memberId:', data.data);
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteSubscription = async (id) => {
//     const response = confirm('Are you sure you want to delete this subscription?');
//     if (response) {
//       await fetch(`${process.env.REACT_APP_API}/api/subscriptions/${id}`, {
//         method: 'DELETE'
//       });
//       setSubscriptions(subscriptions.filter((subscription) => subscription._id !== id));
//     }
//   };

//   const createSubscription = async () => {
//     try {
//       const res = await fetch(`${process.env.REACT_APP_API}/api/subscriptions`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify()
//       });
//       const { message, data, error } = await res.json();
//       alert(message);
//       if (!error) {
//         setSubscriptions([...data]);
//       }
//     } catch (error) {
//       console.error('Error al crear la suscripción:', error);
//     }
//   };

//   return (
//     <section className={styles.container}>
//       <List
//         subscriptions={subscriptions}
//         onDelete={deleteSubscription}
//         onCreate={createSubscription}
//         getClassID={classId}
//         getMemberID={memberId}
//       />
//     </section>
//   );
// }

// export default Subscriptions;

import { useEffect, useState } from 'react';
import styles from './subscriptions.module.css';
import { FaPen, FaTrash } from 'react-icons/fa';

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  // const [name, setName] = useState('');
  // const [description, setDescription] = useState('');
  // const [date, setDate] = useState('');

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

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <section className={styles.container}>
      <section className={styles.list}>
        <header className={styles.header}>
          <h1 className={styles.title}>Subscriptions</h1>
          <button className={styles.btn}> ADD Subs</button>
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
                  <FaPen style={{ color: 'white', cursor: 'pointer' }} />
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
        {/* {showAdd && (
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.inputBox}>
            <label>Class ID:</label>
            <select
              type="text"
              placeholder="class Id"
              value={classId}
              onChange={(e) => setName(e.target.value)}
              required
            >
              {getClassID.map((item) => {
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
              value={MemberId}
              onChange={(e) => setDescription(e.target.value)}
              required
            >
              {getMemberID.map((item) => {
                return (
                  <option key={item?._id} value={item?._id}>
                    {`${item?._id} ${item?.lastName}`}
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
      )}*/}
      </section>
    </section>
  );
}

export default Subscriptions;
