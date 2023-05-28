import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import Table from './Table';
import Form from './Form';

function SuperAdmins() {
  const [superAdmins, setSuperAdmins] = useState([]);

  const getSuperAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/super-admins/`);
      const data = await response.json();
      setSuperAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSuperAdmins();
  }, []);

  const deleteItem = async (id) => {
    try {
      const result = window.confirm('Are you sure that you want to delete?');
      if (result) {
        const response = await fetch(`${process.env.REACT_APP_API}/api/super-admins/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        alert(data.message);
        setSuperAdmins([...superAdmins.filter((superAdmins) => superAdmins._id !== id)]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createItem = async (email, password) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/super-admins`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        setSuperAdmins([...superAdmins, data.data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateItem = async (id, email, password) => {
    const index = superAdmins.findIndex((admin) => admin._id === id);
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/super-admins/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        const update = [...superAdmins];
        update[index] = data.data;
        setSuperAdmins(update);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <Form create={createItem} />
        <Table list={superAdmins} deleteItem={deleteItem} updateItem={updateItem} />
      </div>
    </section>
  );
}

export default SuperAdmins;
