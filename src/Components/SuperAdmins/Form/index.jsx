import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import { Input } from '../../Shared/Inputs';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import Modal from '../../Shared/Modal';
import Button from '../../Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { postSuperAdmins, putSuperAdmin } from '../../../redux/superadmins/thunks';

const Form = () => {
  const { data, message, success, error } = useSelector((state) => state.superadmins);
  const { id } = useParams();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname.includes('edit')) {
      const superadmin = data.find((superadmin) => superadmin._id === id);
      setEmail(superadmin.email);
      setPass(superadmin.password);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (success) {
      history.push('/super-admins');
    }
    if (error) {
      setShowModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, success]);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const sendSuperAdmin = () => {
    if (location.pathname.includes('create')) {
      postSuperAdmins(dispatch, { email, password: pass });
    }

    if (location.pathname.includes('edit')) {
      putSuperAdmin(dispatch, id, { email, password: pass });
    }
  };

  return (
    <div className={styles.formContainer}>
      <Modal onClose={() => setShowModal(false)} isOpen={showModal} text={message} />
      <div className={styles.formBox}>
        <h3 className={styles.title}>
          {location.pathname.includes('create') ? 'Add New Super Admin' : 'Edit Super Admin'}
        </h3>
        <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
          <div className={styles.field}>
            <Input
              labelText={'Email:'}
              type={'text'}
              placeholder={'Email:'}
              value={email}
              onChangeInput={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className={styles.field}>
            <Input
              labelText={'Password:'}
              type={'password'}
              placeholder={'Password:'}
              value={pass}
              onChangeInput={(e) => setPass(e.target.value)}
            />
          </div>
          <p className={styles.comment}>
            {
              '* The password must have uppercase letters, lowercase letters, number and at least 8 characters'
            }
          </p>
          <div className={styles.buttons}>
            <Link to="/super-admins">
              <Button text={'Cancel'} variant={'white'} />
            </Link>
            <Button
              text={location.pathname.includes('create') ? 'Create' : 'Edit'}
              variant={'add'}
              clickAction={() => sendSuperAdmin()}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
