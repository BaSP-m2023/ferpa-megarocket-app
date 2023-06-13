import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import { Input } from '../../Shared/Inputs';
import { Link, useParams, useLocation, Redirect, useHistory } from 'react-router-dom';
import Modal from '../../Shared/Modal';
import Button from '../../Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { postSuperAdmins } from '../../../redux/superadmins/thunks';

const Form = () => {
  const { id } = useParams();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  // const [messageTry, setMessageTry] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { message, success, error } = useSelector((state) => state.superadmins);

  const getSuperAdmins = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`);
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (location.pathname.includes('edit')) {
      const setupForm = async () => {
        const { email, password } = await getSuperAdmins(id);
        setEmail(email);
        setPass(password);
      };
      setupForm();
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

  const onEdit = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ email, password: pass }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data);
      // setMessageTry(data.message);

      if (response.ok) {
        setTimeout(() => {
          setRedirect(true);
        }, 2500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const onAdd = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins`, {
  //       method: 'POST',
  //       body: JSON.stringify({ email, password: pass }),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     const data = await response.json();
  //     setMessage(data.message);

  //     if (response.ok) {
  //       setTimeout(() => {
  //         setRedirect(true);
  //       }, 2500);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const sendSuperAdmin = () => {
    if (location.pathname.includes('create')) {
      postSuperAdmins(dispatch, { email, password: pass });
    }

    if (location.pathname.includes('edit')) {
      onEdit(id);
    }
  };

  return (
    <div className={styles.formContainer}>
      {redirect && <Redirect to="/super-admins" />}
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
              submitting
              clickAction={() => sendSuperAdmin()}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
