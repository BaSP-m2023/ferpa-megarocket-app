import { useState, useEffect } from 'react';
import styles from './admins.module.css';
import List from './List';

function Admins() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const getAdmins = async () => {
      const svAdmins = await getAllAdmins();
      setAdmins(svAdmins);
    };

    getAdmins();
  }, []);

  const getAllAdmins = async () => {
    const res = await fetch(`${process.env.REACT_APP_API}/api/admins`);
    const { data } = await res.json();

    return data;
  };

  // const getAdminID = async (id) => {
  //   const res = await fetch(`${process.env.REACT_APP_API}/api/admins/${id}`);
  //   const data = await res.json();

  //   return data;
  // };

  const addAdmin = async (admin) => {
    const res = await fetch(`${process.env.REACT_APP_API}/api/admins`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(admin)
    });

    const data = await res.json();

    setAdmins([...admins, data]);
  };

  return (
    <section className={styles.container}>
      <List admins={admins} addAdmin={addAdmin} />
    </section>
  );
}

export default Admins;
