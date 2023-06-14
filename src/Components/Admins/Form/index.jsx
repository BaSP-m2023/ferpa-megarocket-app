import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins, updateAdmin, addAdmin } from '../../../redux/admins/thunks';
import styles from './adminsForm.module.css';
import { Input } from '../../Shared/Inputs';
import { Link, useParams, useHistory } from 'react-router-dom';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';

const Form = () => {
  const { isPending, data, error, errorSwitch, message } = useSelector((state) => state.admins);
  const [inputs, setInputs] = useState({});
  const [successModal, setSuccesModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [messageReq, setMessageReq] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    getAdmins(dispatch);
    if (id) {
      setInputs(data.find((admin) => admin._id === id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.length === 0]);

  console.log(data);
  console.log(inputs);
  console.log(isPending);
  console.log(error);
  console.log(errorSwitch);
  console.log(message);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addAdmin(dispatch, inputs);
    setMessageReq();
    setInputs({});
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateAdmin(dispatch, id, inputs);
  };

  const redirectPath = () => {
    const path = { pathname: '/admins' };
    history.push(path);
  };

  // const addAdmin = async (admin) => {
  //   try {
  //     const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-type': 'application/json'
  //       },
  //       body: JSON.stringify(admin)
  //     });
  //     const { error, message } = await res.json();
  //     setMessageReq(message);
  //     if (!error) {
  //       setSuccesModal(!successModal);
  //       setTimeout(() => {
  //         redirectPath();
  //       }, 2000);
  //     } else {
  //       setErrorModal(!errorModal);
  //       setInputs(admin);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const updateAdmin = async (id, updatedAdmin) => {
  //   const adminToSend = { ...updatedAdmin };
  //   delete adminToSend._id;
  //   try {
  //     const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-type': 'application/json'
  //       },
  //       body: JSON.stringify(adminToSend)
  //     });
  //     const { error, message } = await res.json();
  //     setMessageReq(message);
  //     if (!error) {
  //       setSuccesModal(!successModal);
  //       setTimeout(() => {
  //         redirectPath();
  //       }, 2000);
  //     } else {
  //       setErrorModal(!errorModal);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className={styles.container}>
      <Modal
        title={id ? 'Admin Updated' : 'Admin Created'}
        text={messageReq}
        isOpen={successModal}
        onClose={() => {
          setSuccesModal(!successModal);
          redirectPath();
        }}
      />
      <Modal
        title={'ERROR'}
        text={messageReq}
        isOpen={errorModal}
        onClose={() => setErrorModal(!errorModal)}
        warning
      >
        <Button text={'Close'} variant={'delete'} clickAction={() => setErrorModal(!errorModal)} />
      </Modal>
      <form className={`${styles.form} ${styles.list}`} onSubmit={id ? handleUpdate : handleSubmit}>
        <h2 className={styles.title}>{id ? 'Edit Admin' : 'Add Admin'}</h2>
        <div className={styles.inputGroup}>
          <Input
            labelText={'First Name'}
            placeholder={'First Name'}
            nameValue={'firstName'}
            value={inputs?.firstName || ''}
            onChangeInput={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            labelText={'Last Name'}
            placeholder={'Last Name'}
            nameValue={'lastName'}
            value={inputs?.lastName || ''}
            onChangeInput={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            labelText={'DNI'}
            placeholder={'DNI Number'}
            nameValue={'dni'}
            value={inputs?.dni || ''}
            onChangeInput={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            labelText={'Phone'}
            placeholder={'Phone'}
            nameValue={'phone'}
            value={inputs?.phone || ''}
            onChangeInput={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            labelText={'Email'}
            placeholder={'Email'}
            nameValue={'email'}
            value={inputs?.email || ''}
            onChangeInput={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            labelText={'City'}
            placeholder={'City'}
            nameValue={'city'}
            value={inputs?.city || ''}
            onChangeInput={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            type={'password'}
            labelText={'Password'}
            placeholder={'Password'}
            nameValue={'password'}
            value={inputs?.password || ''}
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
