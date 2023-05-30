import { useEffect, useState } from 'react';
import styles from './subscriptions.module.css';
import List from './list';

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [classId, setClassId] = useState([]);
  const [memberId, setMemberId] = useState([]);

  useEffect(() => {
    const getSubscriptions = async () => {
      const subscriptions = await getAllSubscriptions();
      console.log('Subscriptions:', subscriptions);
      setSubscriptions(subscriptions);
    };
    getSubscriptions();
    getClassID();
    getMemberID();
  }, []);

  const getAllSubscriptions = async () => {
    const res = await fetch(`${process.env.REACT_APP_API}/api/subscriptions/all`);
    const { data } = await res.json();
    return data;
  };

  const getClassID = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API}/api/classes`);
      const data = await res.json();
      setClassId(data.data);
      console.log('Datos de classId:', data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMemberID = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API}/api/members`);
      const data = await res.json();
      setMemberId(data.data);
      console.log('Datos de memberId:', data.data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSubscription = async (id) => {
    const response = confirm('Are you sure you want to delete this subscription?');
    if (response) {
      await fetch(`${process.env.REACT_APP_API}/api/subscriptions/${id}`, {
        method: 'DELETE'
      });
      setSubscriptions(subscriptions.filter((subscription) => subscription._id !== id));
    }
  };

  const createSubscription = async (subscription) => {
    try {
      console.log('asdasdasdas:', subscription);
      const res = await fetch(`${process.env.REACT_APP_API}/api/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription)
      });
      const { data } = await res.json();
      setSubscriptions([...subscriptions, data]);
      console.log('Suscripción creada:', data);
    } catch (error) {
      console.error('Error al crear la suscripción:', error);
    }
  };

  return (
    <section className={styles.container}>
      <List
        subscriptions={subscriptions}
        onDelete={deleteSubscription}
        onCreate={createSubscription}
        getClassID={classId}
        getMemberID={memberId}
      />
    </section>
  );
}

export default Subscriptions;
