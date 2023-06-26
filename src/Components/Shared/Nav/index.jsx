import React from 'react';
import styles from './nav.module.css';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();
  return (
    <nav className={styles.navbar}>
      <ul className={styles.links}>
        {location.pathname.includes('/member') && (
          <>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              to="/member/profile"
            >
              <li>Profile</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              to="/member/classes"
            >
              <li>Classes</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              to="/member/subscriptions"
            >
              <li>My Subscriptions</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              to="/member/activities"
            >
              <li>Activities</li>
            </NavLink>
          </>
        )}
        {location.pathname.includes('/admin') && (
          <>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              to="/admin/profile"
            >
              <li>Profile</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              to="/admin/reports"
            >
              <li>Reports</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              to="/admin/activities"
            >
              <li>Activities</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              to="/admin/classes"
            >
              <li>Classes</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              to="/admin/members"
            >
              <li>Members</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              to="/admin/subscriptions"
            >
              <li>Subscriptions</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              to="/admin/trainers"
            >
              <li>Trainers</li>
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
