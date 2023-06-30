import React, { useEffect } from 'react';
import styles from './profile.module.css';
import { useSelector } from 'react-redux';
import Loader from '../../Shared/Loader';
import Button from '../../Shared/Button';
import { Link } from 'react-router-dom';
import { getAuth } from 'redux/auth/thunks';
import { useDispatch } from 'react-redux';

const Profile = () => {
  const { user, isPending } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const firebaseId = sessionStorage.getItem('firebaseUid');

  useEffect(() => {
    dispatch(getAuth(user.token, firebaseId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isPending) {
    return <Loader />;
  }

  // const year = user.birthDay.slice(0, 4);
  // const month = user.birthDay.slice(5, 7);
  // const day = user.birthDay.slice(8, 10);
  // const fixedBirthday = day + '/' + month + '/' + year;

  return (
    <section className={styles.container}>
      <h2 className={styles.header}>Your profile</h2>
      <div className={styles.dataWraper}>
        <div className={styles.userData}>
          <div className={styles.inputDuo}>
            <p className={styles.infoTag}>Name:</p>
            <p className={styles.userInfo}>{user?.firstName}</p>
          </div>
          <div className={styles.inputDuo}>
            <p className={styles.infoTag}>Last Name:</p>
            <p className={styles.userInfo}>{user?.lastName}</p>
          </div>
          <div className={styles.inputDuo}>
            <p className={styles.infoTag}>DNI:</p>
            <p className={styles.userInfo}>{user?.dni}</p>
          </div>
          <div className={styles.inputDuo}>
            <p className={styles.infoTag}>Birthday:</p>
            <p className={styles.userInfo}>{user?.birthday}</p>
          </div>
          <div className={styles.inputDuo}>
            <p className={styles.infoTag}>Current membership:</p>
            <p className={styles.userInfo}>{user?.membership}</p>
          </div>
        </div>
        <div className={styles.userData}>
          <div className={styles.inputDuo}>
            <p className={styles.infoTag}>Phone:</p>
            <p className={styles.userInfo}>{user?.phone}</p>
          </div>
          <div className={styles.inputDuo}>
            <p className={styles.infoTag}>Email:</p>
            <p className={styles.userInfo}>{user?.email}</p>
          </div>
          <div className={styles.inputDuo}>
            <p className={styles.infoTag}>City:</p>
            <p className={styles.userInfo}>{user?.city}</p>
          </div>
          <div className={styles.inputDuo}>
            <p className={styles.infoTag}>Postal Code:</p>
            <p className={styles.userInfo}>{user?.postalCode}</p>
          </div>
          <div className={styles.inputDuo}>
            {user?.isActive ? (
              <div className={styles.userInfo}>You are an active user</div>
            ) : (
              <div className={styles.userInfo}>You are not an active user</div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.editButton}>
        <Link to={`/member/form/${user?._id}`}>
          <Button text={'Edit your profile!'} variant={'add'} />
        </Link>
      </div>
    </section>
  );
};

export default Profile;
