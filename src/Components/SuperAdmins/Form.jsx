import React from 'react';
import styles from './super-admins.module.css';
import { useState } from 'react';
// import {Link} from 'react-router-dom';

function Form({ create }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const submit = (e) => {
    e.preventDefault();
    create(email, pass);
  };

  return (
    <div>
      <h2 className={styles.titleForm}>Create a Super Admin</h2>
      <form className={styles.formPost}>
        <div>
          <label>Email: </label>
          <input
            className={styles.supAdmInput}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Password: </label>
          <input
            className={styles.supAdmInput}
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          ></input>
        </div>
        <button
          className={`${styles.supAdmBtn} ${styles.submitBtn}`}
          onClick={submit}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

// <Link to={'super-admins/add-item'}>{<Form />}</Link>
// <Switch>
// <Route path="/super-admins/add.item" >
// </Switch>

export default Form;
