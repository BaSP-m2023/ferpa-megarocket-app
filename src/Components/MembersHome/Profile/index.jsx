import React, { useEffect } from 'react';
import styles from './profile.module.css';
import Loader from '../../Shared/Loader';
import Button from '../../Shared/Button';
import { Link } from 'react-router-dom';
import { getAuth } from 'redux/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
  const { user, isAuthPending } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');
  const firebaseId = sessionStorage.getItem('firebaseUid');

  useEffect(() => {
    dispatch(getAuth(token, firebaseId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuthPending) {
    return (
      <div className={styles.container}>
        <div className={styles.onTop}>
          <div className={styles.loading}>{<Loader />}</div>
        </div>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <div className={styles.onTop} data-testid={'member-profile-container'}>
        <h2 className={styles.h2}>Account information</h2>
        <div className={styles.nextToEachOther}>
          <div className={styles.big}>
            <div className={styles.list}>
              <span className={styles.title}>Name</span>
              <span className={styles.welcome}>{user?.firstName}</span>
            </div>
            <div className={styles.list}>
              <span className={styles.title}>Email</span>
              <span className={styles.welcome}>{user?.email}</span>
            </div>
            <div className={styles.list}>
              <span className={styles.title}>Membership</span>
              <span className={styles.welcome}>{user?.membership}</span>
            </div>
          </div>
          <div className={styles.big}>
            <div className={styles.list}>
              <span className={styles.title}>Last Name</span>
              <span className={styles.welcome}>{user?.lastName}</span>
            </div>
            <div className={styles.list}>
              <span className={styles.title}>Phone</span>
              <span className={styles.welcome}>{user?.phone}</span>
            </div>
            <div className={styles.list}>
              <span className={styles.title}>Account State</span>
              {user?.isActive ? (
                <div className={styles.welcome}>You are an active user</div>
              ) : (
                <div className={styles.welcome}>You are not an active user</div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.btns}>
          <div className={styles.btn}>
            <Link to={'/change_pass'}>
              <Button variant={'white'} text={'Change Password'} testid={'change-pass-btn'} />
            </Link>
          </div>
          <div className={styles.btn}>
            <Link to={`/member/form/${user?._id}`}>
              <Button variant={'add'} text={'Edit Profile'} testid={'edit-btn'} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
