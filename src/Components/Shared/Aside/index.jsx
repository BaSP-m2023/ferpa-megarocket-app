import React from 'react';
import { Link } from 'react-router-dom';
import styles from './aside.module.css';

const Aside = () => {
  return (
    <aside className={styles.aside} data-testid={'aside-container'}>
      <div className={styles.div}>
        <div className={styles.buttons}>
          <Link to="/home" className={styles.customLink} data-testid={'home-buttom'}>
            <h3 className={styles.link}>Home</h3>
          </Link>
          <Link to="/home/login" className={styles.customLink} data-testid={'login-buttom'}>
            <h3 className={styles.link}>Login</h3>
          </Link>
          <Link to="/home/signup" className={styles.customLink} data-testid={'signup-buttom'}>
            <h3 className={styles.link}>Signup</h3>
          </Link>
        </div>
        <div className={styles.contact} data-testid={'contact-container'}>
          <h3 className={styles.contactTitle}>Contact</h3>
          <div className={styles.contactItem}>
            <img src="../../assets/images/mailAside.svg" alt="mail logo"></img>
            <h4>megarocketSA@gmail.com</h4>
          </div>
          <div className={styles.contactItem}>
            <img src="../../assets/images/home.svg" alt="mail logo"></img>
            <h4>(000)0000-000</h4>
          </div>
          <div className={styles.contactItem}>
            <img src="../../assets/images/phone.svg" alt="mail logo"></img>
            <h4>Somewhere -Zeballos 1410</h4>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
