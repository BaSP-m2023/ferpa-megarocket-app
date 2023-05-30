import { useState } from 'react';
import styles from './admins.module.css';

const UpdateForm = ({ close, admin, updateAdmin }) => {
  const { firstName, lastName, dni, phone, email, city, password } = admin;
  const [adminUpdated, setAdminUpdated] = useState({
    firstName,
    lastName,
    dni,
    phone,
    email,
    city,
    password
  });

  const changeHandler = (e) => {
    setAdminUpdated((prevValues) => ({ ...prevValues, [e.target.name]: e.target.value }));
  };

  const saveUpdate = (e) => {
    e.preventDefault();

    updateAdmin(admin._id, adminUpdated);

    close();
  };

  const cancelUpdate = (e) => {
    e.preventDefault();
    close();
  };

  return (
    <div className={styles.modalContent}>
      <div className={styles.modalHeader}>
        <h3>Update Admin</h3>
      </div>
      <form className={styles.modalForm}>
        <div className={styles.inputGroup}>
          <label>First Name</label>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={adminUpdated.firstName}
            onChange={changeHandler}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={adminUpdated.lastName}
            onChange={changeHandler}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>DNI</label>
          <input
            type="text"
            placeholder="DNI number"
            name="dni"
            value={adminUpdated.dni}
            onChange={changeHandler}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Phone</label>
          <input
            type="text"
            placeholder="Phone number"
            name="phone"
            value={adminUpdated.phone}
            onChange={changeHandler}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={adminUpdated.email}
            onChange={changeHandler}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>City</label>
          <input
            type="text"
            placeholder="City"
            name="city"
            value={adminUpdated.city}
            onChange={changeHandler}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={adminUpdated.password}
            onChange={changeHandler}
          />
        </div>
      </form>
      <div className={styles.modalBtns}>
        <button className={styles.closeBtn} onClick={cancelUpdate}>
          Cancel
        </button>
        <button className={styles.saveBtn} onClick={saveUpdate}>
          Save
        </button>
      </div>
    </div>
  );
};

export default UpdateForm;
