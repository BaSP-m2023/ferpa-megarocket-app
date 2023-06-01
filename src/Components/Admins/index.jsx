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
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
      const { data } = await res.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getAdminID = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`);
      const data = await res.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const addAdmin = async (admin) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(admin)
      });

      const { message, data, error } = await res.json();
      alert(message);

      if (!error) {
        setAdmins([...admins, data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateAdmin = async (id, updatedAdmin) => {
    const adminIndex = admins.findIndex((admin) => admin._id === id);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedAdmin)
      });

      const { message, data, error } = await res.json();
      alert(message);

      if (!error) {
        const actualAdmins = [...admins];
        actualAdmins[adminIndex] = data;
        setAdmins(actualAdmins);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAdmin = async (id) => {
    try {
      const response = window.confirm('Are you sure you want to delete this admin?');
      if (response) {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
          method: 'DELETE'
        });

        const data = await res.json();
        alert(data.message);

        setAdmins(admins.filter((admin) => admin._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.container}>
      <List
        admins={admins}
        addAdmin={addAdmin}
        deleteAdmin={deleteAdmin}
        adminToUpdate={getAdminID}
        updateAdmin={updateAdmin}
      />
    </section>
  );
}

export default Admins;
