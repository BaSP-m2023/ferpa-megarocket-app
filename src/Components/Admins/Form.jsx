import { useState } from 'react';
import styles from './admins.module.css';
import { Input } from '../Shared/Inputs';
import { useParams } from 'react-router-dom';

const Form = ({ addAdmin }) => {
  const [inputs, setInputs] = useState({});
  const { id } = useParams();
  console.log(id);

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
    <div className={styles.container}>
      <form className={`${styles.form} ${styles.list}`} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <Input
            labelText={'First Name'}
            placeholder={'First Name'}
            nameValue={'firstName'}
            value={inputs.firstName || ''}
            onChangeInput={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            labelText={'Last Name'}
            placeholder={'Last Name'}
            nameValue={'lastName'}
            value={inputs.lastName || ''}
            onChangeInput={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            labelText={'DNI'}
            placeholder={'DNI Number'}
            nameValue={'dni'}
            value={inputs.dni || ''}
            onChangeInput={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            labelText={'Phone'}
            placeholder={'Phone'}
            nameValue={'phone'}
            value={inputs.phone || ''}
            onChangeInput={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            labelText={'Email'}
            placeholder={'Email'}
            nameValue={'email'}
            value={inputs.email || ''}
            onChangeInput={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            labelText={'City'}
            placeholder={'City'}
            nameValue={'city'}
            value={inputs.city || ''}
            onChangeInput={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            type={'password'}
            labelText={'Password'}
            placeholder={'Password'}
            nameValue={'password'}
            value={inputs.password || ''}
            onChangeInput={handleChange}
          />
        </div>
        <input type="submit" value="Add Admin" className={styles.submitBtn} />
      </form>
    </div>
  );
};

export default Form;
