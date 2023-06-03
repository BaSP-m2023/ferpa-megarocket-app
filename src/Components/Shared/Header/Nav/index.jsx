import React from 'react';
import styles from './nav.module.css';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.links}>
        <NavLink
          activeClassName={`${styles.link} ${styles.linkFocused}`}
          className={styles.link}
          to="/home"
        >
          <li>Home</li>
        </NavLink>
        <NavLink
          activeClassName={`${styles.link} ${styles.linkFocused}`}
          className={styles.link}
          to="/activities"
        >
          <li>Activities</li>
        </NavLink>
        <NavLink
          activeClassName={`${styles.link} ${styles.linkFocused}`}
          className={`${styles.link}`}
          to="/admins"
        >
          <li>Admins</li>
        </NavLink>
        <NavLink
          activeClassName={`${styles.link} ${styles.linkFocused}`}
          className={`${styles.link}`}
          to="/classes"
        >
          <li>Classes</li>
        </NavLink>
        <NavLink
          activeClassName={`${styles.link} ${styles.linkFocused}`}
          className={`${styles.link}`}
          to="/members"
        >
          <li>Members</li>
        </NavLink>
        <NavLink
          activeClassName={`${styles.link} ${styles.linkFocused}`}
          className={`${styles.link}`}
          to="/subscriptions"
        >
          <li>Subscriptions</li>
        </NavLink>
        <NavLink
          activeClassName={`${styles.link} ${styles.linkFocused}`}
          className={`${styles.link}`}
          to="/super-admins"
        >
          <li>Super Admins</li>
        </NavLink>
        <NavLink
          activeClassName={`${styles.link} ${styles.linkFocused}`}
          className={`${styles.link}`}
          to="/trainers"
        >
          <li>Trainers</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Nav;
