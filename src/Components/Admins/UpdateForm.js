import styles from './admins.module.css';

const UpdateForm = ({ onEdit }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <label>Update Admin</label>
          <span onClick={onEdit} style={{ cursor: 'pointer' }}>
            &times;
          </span>
        </div>
        <form className={styles.modalForm}>
          <div>
            <label>First Name</label>
            <input type="text" placeholder="First Name" />
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" placeholder="Last Name" />
          </div>
          <div>
            <label>DNI</label>
            <input type="number" placeholder="DNI number" />
          </div>
          <div>
            <label>Phone</label>
            <input type="number" placeholder="Phone number" />
          </div>
          <div>
            <label>Email</label>
            <input type="text" placeholder="Email" />
          </div>
          <div>
            <label>City</label>
            <input type="text" placeholder="City" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" placeholder="Password" />
          </div>
        </form>
        <div className={styles.modalBtns}>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
