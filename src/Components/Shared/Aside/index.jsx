import React from 'react';
import { Link } from 'react-router-dom';
import styles from './aside.module.css';
/* import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { asideOnThunk, asideOffThunk } from 'redux/aside/thunks'; */

const Aside = () => {
  const role = sessionStorage.getItem('role');
  /*   const { isOn } = useSelector((state) => state.aside);
  const dispatch = useDispatch(); */

  /*   const handleSandwichClick = () => {
    if (isOn) {
      dispatch(asideOffThunk());
    } else {
      dispatch(asideOnThunk());
    }
  }; */
  return (
    <div className={styles.sidebar}>
      <aside className={styles.aside} data-testid={'aside-container'}>
        {/* <div className={styles.menuIcon}>
          <Button
            variant={'exitIcon'}
            className={styles.sandwich}
            testid={'sandwich-btn'}
            clickAction={handleSandwichClick}
          />
        </div> */}
        <div className={styles.div}>
          <h3 className={styles.menuTitle}>Menu</h3>
          {!role && (
            <div className={styles.buttons}>
              <Link to="/home" className={styles.customLink} data-testid={'home-button'}>
                <h3 className={styles.link}>Home</h3>
              </Link>
              <Link to="/home/login" className={styles.customLink} data-testid={'login-button'}>
                <h3 className={styles.link}>Login</h3>
              </Link>
              <Link to="/home/signup" className={styles.customLink} data-testid={'signup-button'}>
                <h3 className={styles.link}>Signup</h3>
              </Link>
            </div>
          )}
          {role === 'MEMBER' && (
            <div className={styles.buttons}>
              <Link to="/home" className={styles.customLink} data-testid={'home-button'}>
                <h3 className={styles.link}>Home</h3>
              </Link>
              <Link
                to="/member/profile"
                className={styles.customLink}
                data-testid={'profile-button'}
              >
                <h3 className={styles.link}>Profile</h3>
              </Link>
            </div>
          )}
          {role === 'ADMIN' && (
            <div className={styles.buttons}>
              <Link to="/home" className={styles.customLink} data-testid={'home-button'}>
                <h3 className={styles.link}>Home</h3>
              </Link>
              <Link to="/admin/profile" className={styles.customLink} data-testid={'login-button'}>
                <h3 className={styles.link}>Profile</h3>
              </Link>
            </div>
          )}
          {role === 'TRAINER' && (
            <div className={styles.buttons}>
              <Link to="/home" className={styles.customLink} data-testid={'home-button'}>
                <h3 className={styles.link}>Home</h3>
              </Link>
              <Link
                to="/trainer/profile"
                className={styles.customLink}
                data-testid={'login-button'}
              >
                <h3 className={styles.link}>Profile</h3>
              </Link>
            </div>
          )}
          <div className={styles.contact} data-testid={'contact-container'}>
            <h3 className={styles.contactTitle}>Contact</h3>
            <div className={styles.contactItem}>
              <img src="../../assets/images/mailAside.svg" alt="mail logo"></img>
              <h4>megarocketSA@gmail.com</h4>
            </div>
            <div className={styles.contactItem}>
              <img src="../../assets/images/home.svg" alt="mail logo"></img>
              <h4>(0341) - 4212121</h4>
            </div>
            <div className={styles.contactItem}>
              <img src="../../assets/images/phone.svg" alt="mail logo"></img>
              <h4>Zeballos 1410</h4>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Aside;
