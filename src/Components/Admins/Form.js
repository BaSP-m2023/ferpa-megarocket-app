import styles from './admins.module.css';

const Form = () => {
  return (
    <form className={styles.form}>
      <div className={styles.inputGroup}>
        <label>First Name</label>
        <input type="text" placeholder="First Name" />
      </div>
      <div className={styles.inputGroup}>
        <label>Last Name</label>
        <input type="text" placeholder="Last Name" />
      </div>
      <div className={styles.inputGroup}>
        <label>DNI</label>
        <input type="number" placeholder="DNI number" />
      </div>
      <div className={styles.inputGroup}>
        <label>Phone</label>
        <input type="number" placeholder="Phone number" />
      </div>
      <div className={styles.inputGroup}>
        <label>Email</label>
        <input type="text" placeholder="Email" />
      </div>
      <div className={styles.inputGroup}>
        <label>City</label>
        <input type="text" placeholder="City" />
      </div>
      <div className={styles.inputGroup}>
        <label>Password</label>
        <input type="password" placeholder="Password" />
      </div>
      <input type="submit" value="Add Admin" className={styles.submitBtn} />
    </form>
  );
};

export default Form;
