import { useState, useEffect } from 'react';
import styles from './admins.module.css';
import { Input } from '../Shared/Inputs';
import { Link, useParams } from 'react-router-dom';
import Button from '../Shared/Button';

const Form = () => {
  const [inputs, setInputs] = useState({});
  const { id } = useParams();

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

  const handleUpdate = (e) => {
    e.preventDefault();
    updateAdmin(id, inputs);
  };

  const addAdmin = async (admin) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(admin)
      });

      const { message } = await res.json();
      alert(message);
    } catch (error) {
      console.error(error);
    }
  };

  const getAdminID = async (id) => {
    console.log(id);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`);
      const { data, error, message } = await res.json();
      if (data) {
        setInputs(data);
      }
      console.log(error);
      console.log(message);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateAdmin = async (id, updatedAdmin) => {
    const adminToSend = { ...updatedAdmin };
    delete adminToSend._id;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(adminToSend)
      });

      const { message } = await res.json();
      alert(message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      getAdminID(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <form className={`${styles.form} ${styles.list}`} onSubmit={id ? handleUpdate : handleSubmit}>
        <h2 className={styles.title}>{id ? 'Edit Admin' : 'Add Admin'}</h2>
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
        <div className={styles.modalBtns}>
          <Link to="/admins">
            <Button text={'Cancel'} variant={'white'} />
          </Link>
          {id ? (
            <Button variant={'add'} text={'Update Admin'} submitting />
          ) : (
            <Button variant={'add'} text={'Add Admin'} submitting />
            // <input type="submit" value="Add Admin" className={styles.submitBtn} />
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
