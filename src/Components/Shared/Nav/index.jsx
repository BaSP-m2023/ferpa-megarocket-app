import React from 'react';
import styles from './nav.module.css';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  const role = sessionStorage.getItem('role');
  return (
    <nav className={styles.navbar} data-testid={'nav-container'}>
      <ul className={styles.links}>
        {role === 'MEMBER' && (
          <>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              data-testid={'member-profile'}
              to="/member/profile"
            >
              <li>Profile</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              data-testid={'member-schedule'}
              to="/member/schedule"
            >
              <li>Schedule</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              data-testid={'member-activities'}
              to="/member/activities"
            >
              <li>Activities</li>
            </NavLink>
          </>
        )}
        {role === 'ADMIN' && (
          <>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              data-testid={'admins-profile'}
              to="/admin/profile"
            >
              <li>Profile</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              data-testid={'admins-reports'}
              to="/admin/reports"
            >
              <li>Reports</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              data-testid={'admins-activities'}
              to="/admin/activities"
            >
              <li>Activities</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              data-testid={'admins-classes'}
              to="/admin/classes"
            >
              <li>Classes</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              data-testid={'admins-members'}
              to="/admin/members"
            >
              <li>Members</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              data-testid={'admins-subs'}
              to="/admin/subscriptions"
            >
              <li>Subscriptions</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              data-testid={'admins-trainers'}
              to="/admin/trainers"
            >
              <li>Trainers</li>
            </NavLink>
          </>
        )}
        {role === 'TRAINER' && (
          <>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              data-testid={'trainer-profile'}
              to="/trainer/profile"
            >
              <li>Profile</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              data-testid={'trainer-schedule'}
              to="/trainer/schedule"
            >
              <li>Schedule</li>
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
