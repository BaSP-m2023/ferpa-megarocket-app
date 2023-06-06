import { useState, useEffect } from 'react';
import styles from './admins.module.css';
import Button from '../Shared/Button';
import { Link } from 'react-router-dom';

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
      <section className={styles.list}>
        <header className={styles.header}>
          <h1 className={styles.title}>Administrators</h1>
          <Link to="/admins/form">
            <Button text={'Add Admin'} type={'add'} />
          </Link>
        </header>
        {admins.length > 0 ? (
          <table className={styles.table}>
            <tbody className={styles.tbody}>
              <tr className={styles.thead}>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>City</th>
                <th className={styles.th}>Email</th>
                <th className={styles.th}></th>
                <th className={styles.th}></th>
              </tr>
              {admins.map((admin) => {
                return (
                  <tr className={styles.tr} key={admin._id}>
                    <td className={styles.td}>{admin.firstName}</td>
                    <td className={styles.td}>{admin.city}</td>
                    <td className={styles.td}>{admin.email}</td>
                    <td className={styles.td}></td>
                    <td className={styles.icons}>
                      <Link to={`/admins/form/${admin._id}`}>
                        <Button type={'edit'} />
                      </Link>
                      <img
                        alt="delete-icon"
                        src="/assets/images/delete-icon.svg"
                        onClick={() => deleteAdmin(admin._id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <span className={styles.emptySpan}>No admins created yet</span>
        )}
      </section>
    </section>
  );
}

export default Admins;
