import React from 'react';
import styles from './profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMembers } from '../../../redux/members/thunks';
import Loader from '../../Shared/Loader';
import Button from '../../Shared/Button';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { data, isPending } = useSelector((state) => state.members);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembers());
  }, []);

  if (isPending) {
    return <Loader />;
  }

  const year = data[0].birthDay.slice(0, 4);
  const month = data[0].birthDay.slice(5, 7);
  const day = data[0].birthDay.slice(8, 10);
  const fixedBirthday = day + '/' + month + '/' + year;

  return (
    <section className={styles.container}>
      <h2 className={styles.header}>Your profile</h2>
      <div className={styles.dataWraper}>
        <div className={styles.userData}>
          <div className={styles.inputDuo}>
            <p className={styles.infoTag}>Name:</p>
            <p className={styles.userInfo}>{data[0].firstName}</p>
          </div>
          <div className={styles.inputDuo}>
            <p className={styles.infoTag}>Last Name:</p>
            <p className={styles.userInfo}>{data[0].lastName}</p>
          </div>
          <div className={styles.inputDuo}>
            <p className={styles.infoTag}>DNI:</p>
            <p className={styles.userInfo}>{data[0].dni}</p>
          </div>
          <div className={styles.inputDuo}>
            <p className={styles.infoTag}>Birthday:</p>
            <p className={styles.userInfo}>{fixedBirthday}</p>
          </div>
          <div className={styles.inputDuo}>
            <p className={styles.infoTag}>Current membership:</p>
            <p className={styles.userInfo}>{data[0].membership}</p>
          </div>
        </div>
        <div className={styles.userData}>
          <div className={styles.inputDuo}>
            <p className={styles.infoTag}>Phone:</p>
            <p className={styles.userInfo}>{data[0].phone}</p>
          </div>
          <div className={styles.inputDuo}>
            <p className={styles.infoTag}>Email:</p>
            <p className={styles.userInfo}>{data[0].email}</p>
          </div>
          <div className={styles.inputDuo}>
            <p className={styles.infoTag}>City:</p>
            <p className={styles.userInfo}>{data[0].city}</p>
          </div>
          <div className={styles.inputDuo}>
            <p className={styles.infoTag}>Postal Code:</p>
            <p className={styles.userInfo}>{data[0].postalCode}</p>
          </div>
          <div className={styles.inputDuo}>
            {data[0].isActive ? (
              <div className={styles.userInfo}>You are an active user</div>
            ) : (
              <div className={styles.userInfo}>You are not an active user</div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.editButton}>
        <Link to={`/members/home/edit/${data[0]._id}`}>
          <Button text={'Edit your profile!'} variant={'add'} />
        </Link>
      </div>
    </section>
  );
};

export default Profile;
