import React from 'react';
import styles from './nav.module.css';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();
  return (
    <nav className={styles.navbar}>
      <ul className={styles.links}>
        {location.pathname.includes('/members/home') && (
          <>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              to="/members/home/profile"
            >
              <li>Profile</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              to="/members/home/classes"
            >
              <li>Classes</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              to="/members/home/subscriptions"
            >
              <li>My Subscriptions</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              to="/members/home/activities"
            >
              <li>Activities</li>
            </NavLink>
          </>
        )}
        {location.pathname.includes('/admins/home') && (
          <>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              to="/admins/home/profile"
            >
              <li>Profile</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              to="/admins/home/reports"
            >
              <li>Reports</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              to="/admins/home/activities"
            >
              <li>Activities</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              to="/admins/home/classes"
            >
              <li>Classes</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              to="/admins/home/members"
            >
              <li>Members</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              to="/admins/home/subscriptions"
            >
              <li>Subscriptions</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              to="/admins/home/trainers"
            >
              <li>Trainers</li>
            </NavLink>
          </>
        )}
        {location.pathname.includes('/superadmins/home') && (
          <>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              to="/superadmins/home/admins"
            >
              <li>Admins</li>
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
