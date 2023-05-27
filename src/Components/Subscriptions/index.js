import { useEffect, useState } from 'react';
import styles from './subscriptions.module.css';
import List from './list';

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const getSubscriptions = async () => {
      const svSubscriptions = await getAllSubscriptions();
      setSubscriptions(svSubscriptions);
    };
    getSubscriptions();
  }, []);

  const getAllSubscriptions = async () => {
    const res = await fetch(`${process.env.REACT_APP_API}/api/subscriptions`);
    const { data } = await res.json();
    return data;
  };

  return (
    <section className={styles.container}>
      <List subscriptions={subscriptions} />
    </section>
  );
}

export default Subscriptions;
