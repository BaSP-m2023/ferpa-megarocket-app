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
    console.log(admin);
    const res = await fetch(`${process.env.REACT_APP_API}/api/admins`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(admin)
    });

    const data = await res.json();
    console.log(data);

    // setAdmins([...admins, data]);
  };

  const deleteAdmin = async (id) => {
    const response = confirm('Are you sure you want to delete this admin?');
    if (response) {
      await fetch(`${process.env.REACT_APP_API}/api/admins/${id}`, {
        method: 'DELETE'
      });

      setAdmins(admins.filter((admin) => admin._id !== id));
    }
  };

  return (
    <section className={styles.container}>
      <List admins={admins} addAdmin={addAdmin} deleteAdmin={deleteAdmin} />
    </section>
  );
}

export default Admins;
