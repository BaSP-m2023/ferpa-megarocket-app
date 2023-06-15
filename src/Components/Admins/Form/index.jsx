import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins, updateAdmin, addAdmin } from '../../../redux/admins/thunks';
import styles from './adminsForm.module.css';
import { Input } from '../../Shared/Inputs';
import { Link, useParams, useHistory } from 'react-router-dom';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';
import * as actionsConstants from '../../../redux/admins/actions';

const Form = () => {
  const { isPending, data, error, errorSwitch, message } = useSelector((state) => state.admins);
  const [inputs, setInputs] = useState({});
  const [successModal, setSuccesModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    getAdmins(dispatch);
    if (id) {
      setInputs(data.find((admin) => admin._id === id));
    } else {
      setInputs({});
    }
    return () => {
      putPending();
      dispatch(actionsConstants.addAdminsPending());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.length === 0]);

  useEffect(() => {
    if (message && !errorSwitch && !isPending) {
      setSuccesModal(true);
      setTimeout(() => {
        setSuccesModal(false);
        redirectPath();
        putPending();
      }, 2000);
      putPending();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    if (errorSwitch) {
      setErrorModal(true);
      setInputs(inputs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorSwitch, error]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const putPending = () => {
    dispatch(actionsConstants.putAdminsPending());
  };

  const addPending = () => {
    dispatch(actionsConstants.addAdminsPending());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAdmin(dispatch, inputs);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateAdmin(dispatch, id, inputs);
  };

  const redirectPath = () => {
    const path = { pathname: '/admins' };
    history.push(path);
  };

  return (
    <div className={styles.container}>
      <Modal
        text={id ? 'Admin Successfully Updated' : 'Admin Successfully Created'}
        isOpen={successModal}
        onClose={() => {
          setSuccesModal(!successModal);
          redirectPath();
        }}
      />
      <Modal
        title={'ERROR'}
        text={error}
        isOpen={errorModal}
        onClose={() => {
          setErrorModal(!errorModal);
          putPending();
          addPending();
        }}
        warning
      >
        <Button
          text={'Close'}
          variant={'delete'}
          clickAction={() => {
            setErrorModal(!errorModal);
            putPending();
            addPending();
          }}
        />
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
          <p className={styles.passMessage}>
            * The password must have lowercase letters, uppercase letters, numbers, special
            characters (@$!%*#?&) and at least 8 characters
          </p>
        </div>
        <div className={styles.modalBtns}>
          <Link to="/admins">
            <Button text={'Cancel'} variant={'white'} />
          </Link>
          {id ? (
            <Button variant={'add'} text={'Update Admin'} submitting />
          ) : (
            <Button variant={'add'} text={'Add Admin'} submitting />
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
