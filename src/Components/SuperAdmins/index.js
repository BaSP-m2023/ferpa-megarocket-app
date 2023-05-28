import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import Table from './Table';

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

  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <Table list={superAdmins} />
      </div>
    </section>
  );
}

export default SuperAdmins;
