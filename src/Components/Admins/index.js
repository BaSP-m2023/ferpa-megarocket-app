import { useState, useEffect } from 'react';
import styles from './admins.module.css';
import List from './List';
import UpdateForm from './UpdateForm';

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [showEditForm, setEditForm] = useState(false);

  const setupEditForm = () => {
    setEditForm(!showEditForm);
  };

  useEffect(() => {
    const getAdmins = async () => {
      const svAdmins = await getAllAdmins();
      setAdmins(svAdmins);
    };

    getAdmins();
  }, []);

  const getAllAdmins = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API}/api/admins`);
      const { data } = await res.json();

      return data;
    } catch (error) {
      console.log(error);
    }
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

    const { data } = await res.json();
    console.log(data);

    setAdmins([...admins, data]);
  };

  // const updateAdmin = async (id) => {
  //   const adminToUpdate = getAdminID(id);
  //   const updatedAdmin = { ...adminToUpdate };

  //   const res = await fetch(`${process.env.REACT_APP_API}/api/admins/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify(updatedAdmin)
  //   });

  //   const { data } = await res.json();

  //   setAdmins(admins.map((admin) => (admin.id === id ? { data } : admin)));
  // };

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
      <List
        admins={admins}
        addAdmin={addAdmin}
        deleteAdmin={deleteAdmin}
        onEdit={setupEditForm}
        // updateAdmin={updateAdmin}
      />
      {showEditForm && <UpdateForm onEdit={setupEditForm} />}
    </section>
  );
}

export default Admins;
