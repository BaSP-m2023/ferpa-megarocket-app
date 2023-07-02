import Button from 'Components/Shared/Button';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getAdmins } from 'redux/admins/thunks';
import styles from './profile.module.css';

const Profile = () => {
  const { data } = useSelector((state) => state.admins);
  const fistItem = data[0];
  const dispatch = useDispatch();
  useEffect(() => {
    getAdmins(dispatch);
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
              <span className={styles.welcome}>{fistItem?.firstName || 'empty'}</span>
            </div>
            <div className={styles.list}>
              <span className={styles.title}>Last Name</span>
              <span className={styles.welcome}>{fistItem?.lastName || 'empty'}</span>
            </div>
            <div className={styles.list}>
              <span className={styles.title}>Email</span>
              <span className={styles.welcome}>{fistItem?.email || 'empty'}</span>
            </div>
          </div>
          <div className={styles.big}>
            <div className={styles.list}>
              <span className={styles.title}>City</span>
              <span className={styles.welcome}>{fistItem?.city || 'empty'}</span>
            </div>
            <div className={styles.list}>
              <span className={styles.title}>Phone Number</span>
              <span className={styles.welcome}>{fistItem?.phone || 'empty'}</span>
            </div>
            <div className={styles.list}>
              <span className={styles.title}>DNI</span>
              <span className={styles.welcome}>{fistItem?.dni || 'empty'}</span>
            </div>
          </div>
        </div>
        <Link to={`/admin/form/${fistItem?._id}`}>
          <Button variant={'add'} text={'Edit Profile'} />
        </Link>
      </div>
    </section>
  );
};

export default Profile;
