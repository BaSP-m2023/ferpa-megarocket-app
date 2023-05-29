import { useState } from 'react';
import styles from './admins.module.css';
import Table from './Table';
import Button from './Button';
import Form from './Form';

const List = ({ admins, addAdmin, deleteAdmin, adminToUpdate, updateAdmin }) => {
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
      {admins.length > 0 ? (
        <Table
          admins={admins}
          deleteAdmin={deleteAdmin}
          adminToUpdate={adminToUpdate}
          updateAdmin={updateAdmin}
        />
      ) : (
        <span className={styles.emptySpan}>No admins created yet</span>
      )}
    </section>
  );
};

export default List;
