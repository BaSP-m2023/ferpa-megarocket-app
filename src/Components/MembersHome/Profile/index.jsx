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
      <div className={styles.body}>
        <div className={styles.dataWraper}>
          <div className={styles.userData}>
            <p className={styles.infoTag}>Name:</p>
            <p className={styles.userInfo}>{data[0].firstName}</p>
            <p className={styles.infoTag}>Last Name:</p>
            <p className={styles.userInfo}>{data[0].lastName}</p>
            <p className={styles.infoTag}>DNI:</p>
            <p className={styles.userInfo}>{data[0].dni}</p>
            <p className={styles.infoTag}>Birthday:</p>
            <p className={styles.userInfo}>{fixedBirthday}</p>
          </div>
          <div className={styles.userData}>
            <p className={styles.infoTag}>Phone:</p>
            <p className={styles.userInfo}>{data[0].phone}</p>
            <p className={styles.infoTag}>Email:</p>
            <p className={styles.userInfo}>{data[0].email}</p>
            <p className={styles.infoTag}>City:</p>
            <p className={styles.userInfo}>{data[0].city}</p>
            <p className={styles.infoTag}>Postal Code:</p>
            <p className={styles.userInfo}>{data[0].postalCode}</p>
          </div>
          <div>
            <Link to={`/members/home/edit/${data[0]._id}`}>
              <Button text={'Edit your profile!'} variant={'add'} />
            </Link>
          </div>
        </div>
        <div className={styles.membershipData}>
          <div className={styles.membershipUnit}>
            <p className={styles.infoTag}>Current membership:</p>
            <p className={styles.membershipType}>{data[0].membership}</p>
          </div>
          {data[0].isActive ? (
            <div className={`${styles.membershipUnit} ${styles.activeYes}`}>
              You are an active user
            </div>
          ) : (
            <div className={`${styles.membershipUnit} ${styles.activeYes}`}>
              You are not an active user
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
