import { useState } from 'react';
import styles from './admins.module.css';
import { Input } from '../Shared/Inputs';
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
          <Input
            labelText={'First Name'}
            placeholder={'First Name'}
            nameValue={'firstName'}
            value={adminUpdated.firstName}
            onChangeInput={changeHandler}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            labelText={'Last Name'}
            placeholder={'Last Name'}
            nameValue={'lastName'}
            value={adminUpdated.lastName}
            onChangeInput={changeHandler}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            labelText={'DNI'}
            placeholder={'DNI Number'}
            nameValue={'dni'}
            value={adminUpdated.dni}
            onChangeInput={changeHandler}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            labelText={'Phone'}
            placeholder={'Phone number'}
            nameValue={'phone'}
            value={adminUpdated.phone}
            onChangeInput={changeHandler}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            labelText={'Email'}
            placeholder={'Email'}
            nameValue={'email'}
            value={adminUpdated.email}
            onChangeInput={changeHandler}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            labelText={'City'}
            placeholder={'City'}
            nameValue={'city'}
            value={adminUpdated.city}
            onChangeInput={changeHandler}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            type={'password'}
            labelText={'Password'}
            placeholder={'Password'}
            nameValue={'password'}
            value={adminUpdated.password}
            onChangeInput={changeHandler}
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
