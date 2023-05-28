import React from 'react';
import styles from './super-admins.module.css';
import { useState } from 'react';

function Form({ create }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const submit = (e) => {
    e.preventDefault();
    create(email, pass);
  };

  return (
    <form id={styles.formPost}>
      <div>
        <label>Email: </label>
        <input
          id={styles.emailImput}
          type={'text'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Password: </label>
        <input
          id={styles.passImput}
          type={'password'}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        ></input>
      </div>
      <button className={styles.submitBtn} onClick={submit} type={'submit'}>
        Submit
      </button>
    </form>
  );
}

export default Form;
