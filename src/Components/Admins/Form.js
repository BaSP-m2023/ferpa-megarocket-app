import { useState } from 'react';
import styles from './admins.module.css';

const Form = ({ addAdmin }) => {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addAdmin(inputs);

    setInputs({});
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label>First Name</label>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={inputs.firstName}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={inputs.lasttName}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputGroup}>
        <label>DNI</label>
        <input
          type="number"
          placeholder="DNI number"
          name="dni"
          value={inputs.dni}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Phone</label>
        <input
          type="number"
          placeholder="Phone number"
          value={inputs.phone}
          name="phone"
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Email</label>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputGroup}>
        <label>City</label>
        <input
          type="text"
          placeholder="City"
          name="city"
          value={inputs.city}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
        />
      </div>
      <input type="submit" value="Add Admin" className={styles.submitBtn} />
    </form>
  );
};

export default Form;
