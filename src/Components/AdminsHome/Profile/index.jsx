import Button from 'Components/Shared/Button';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './profile.module.css';
import { getAuth } from 'redux/auth/thunks';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');
  const firebaseId = sessionStorage.getItem('firebaseUid');

  useEffect(() => {
    dispatch(getAuth(token, firebaseId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.onTop} data-testid={'admins-profile-container'}>
        <h2 className={styles.h2}>Account information</h2>
        <div className={styles.nextToEachOther}>
          <div className={styles.big}>
            <div className={styles.list}>
              <span className={styles.title}>Name</span>
              <span className={styles.welcome}>{user?.firstName}</span>
            </div>
            <div className={styles.list}>
              <span className={styles.title}>Last Name</span>
              <span className={styles.welcome}>{user?.lastName}</span>
            </div>
            <div className={styles.list}>
              <span className={styles.title}>Email</span>
              <span className={styles.welcome}>{user?.email}</span>
            </div>
          </div>
          <div className={styles.big}>
            <div className={styles.list}>
              <span className={styles.title}>City</span>
              <span className={styles.welcome}>{user?.city}</span>
            </div>
            <div className={styles.list}>
              <span className={styles.title}>Phone Number</span>
              <span className={styles.welcome}>{user?.phone}</span>
            </div>
            <div className={styles.list}>
              <span className={styles.title}>DNI</span>
              <span className={styles.welcome}>{user?.dni}</span>
            </div>
          </div>
        </div>
        <Link to={'/change_pass'}>
          <Button text={'Change Password'} testid={'change-pass-btn'} />
        </Link>
        <Link to={`/admin/form/${user?._id}`}>
          <Button variant={'add'} text={'Edit Profile'} testid={'edit-btn'} />
        </Link>
      </div>
    </section>
  );
};

export default Profile;
