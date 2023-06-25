import React from 'react';
import styles from './nav.module.css';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();
  return (
    <nav className={styles.navbar} data-testid={'nav-container'}>
      <ul className={styles.links}>
        {location.pathname.includes('/members/home') && (
          <>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              data-testid={'member-profile'}
              to="/members/home/profile"
            >
              <li>Profile</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              data-testid={'member-classes'}
              to="/members/home/classes"
            >
              <li>Classes</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              data-testid={'member-subs'}
              to="/members/home/subscriptions"
            >
              <li>My Subscriptions</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              data-testid={'member-activities'}
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
              data-testid={'admins-profile'}
              to="/admins/home/profile"
            >
              <li>Profile</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              data-testid={'admins-reports'}
              to="/admins/home/reports"
            >
              <li>Reports</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              data-testid={'admins-activities'}
              to="/admins/home/activities"
            >
              <li>Activities</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              data-testid={'admins-classes'}
              to="/admins/home/classes"
            >
              <li>Classes</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              data-testid={'admins-members'}
              to="/admins/home/members"
            >
              <li>Members</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              data-testid={'admins-subs'}
              to="/admins/home/subscriptions"
            >
              <li>Subscriptions</li>
            </NavLink>
            <NavLink
              activeClassName={styles.linkFocused}
              className={styles.link}
              data-testid={'admins-trainers'}
              to="/admins/home/trainers"
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
