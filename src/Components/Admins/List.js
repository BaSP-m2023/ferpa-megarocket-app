import { useState } from 'react';
import styles from './admins.module.css';
import Table from './Table';
import Button from './Button';
import Form from './Form';

const List = ({ admins, addAdmin, deleteAdmin }) => {
  const [showForm, setForm] = useState(false);

  return (
    <section className={styles.list}>
      <header className={styles.header}>
        <h1 className={styles.title}>Administrators</h1>
        <Button
          color={showForm ? '#FF3E1D' : '#46A37C'}
          text={showForm ? 'Close' : 'Add Admin'}
          onclick={() => setForm(!showForm)}
        />
      </header>
      {showForm && <Form addAdmin={addAdmin} />}
      <Table admins={admins} deleteAdmin={deleteAdmin} />
    </section>
  );
};

export default List;
