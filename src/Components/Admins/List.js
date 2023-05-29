import { useState } from 'react';
import styles from './admins.module.css';
import Table from './Table';
import Button from './Button';
import Form from './Form';
import UpdateForm from './UpdateForm';

const List = ({ admins, addAdmin, deleteAdmin, updateAdmin }) => {
  const [showForm, setForm] = useState(false);
  const [showEditForm, setEditForm] = useState(false);
  const [adminToUpdate, setId] = useState('');

  const setupEditForm = (admin = '') => {
    setId(admin);
    setEditForm(!showEditForm);
  };

  return (
    <section className={styles.list}>
      <header className={styles.header}>
        <h1 className={styles.title}>Administrators</h1>
        <Button
          setStyle={showForm ? `${styles.btnClosed}` : `${styles.btn}`}
          text={showForm ? 'Close' : 'Add Admin'}
          onclick={() => setForm(!showForm)}
        />
      </header>
      {showForm && <Form addAdmin={addAdmin} />}
      {admins.length > 0 ? (
        <Table admins={admins} deleteAdmin={deleteAdmin} onEdit={setupEditForm} />
      ) : (
        <span className={styles.emptySpan}>No admins created yet</span>
      )}
      {showEditForm && (
        <UpdateForm close={setupEditForm} updateAdmin={updateAdmin} admin={adminToUpdate} />
      )}
    </section>
  );
};

export default List;
