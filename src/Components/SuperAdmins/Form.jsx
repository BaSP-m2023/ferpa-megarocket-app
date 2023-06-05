import React from 'react';
import styles from './super-admins.module.css';
import { useState } from 'react';
import Button from '../Shared/Button';
import { Input } from '../Shared/Inputs';

function Form({ create }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const submit = (e) => {
    e.preventDefault();
    create(email, pass);
    setEmail('');
    setPass('');
  };

  return (
    <div>
      <h2>Create a Super Admin</h2>
      <form className={styles.form}>
        <div>
          <Input
            labelText={'Email:'}
            type={'text'}
            placeholder={'Email:'}
            value={email}
            onChangeInput={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Input
            labelText={'Password:'}
            type={'text'}
            placeholder={'Password:'}
            value={pass}
            onChangeInput={(e) => setPass(e.target.value)}
          />
        </div>
        <Button text={'Submit'} clickAction={submit} type="submit" />
      </form>
    </div>
  );
}

export default Form;
