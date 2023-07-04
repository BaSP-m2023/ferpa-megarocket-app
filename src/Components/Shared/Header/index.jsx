import styles from './header.module.css';
import Nav from '../Nav';
import Button from '../Button';
import { useHistory, useLocation } from 'react-router-dom';
import { logout } from 'redux/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { asideOnThunk, asideOffThunk } from 'redux/aside/thunks';

function Header() {
  const { isOn } = useSelector((state) => state.aside);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const currentPath = location.pathname;
  const homePath = '/home';
  const loginPath = '/home/login';
  const signupPath = '/home/signup';
  const role = sessionStorage.getItem('role');
  const handleLogout = async () => {
    await dispatch(logout());
    history.push('/home');
  };

  const handleSandwichClick = () => {
    if (isOn) {
      dispatch(asideOffThunk());
    } else {
      dispatch(asideOnThunk());
    }
  };

  return (
    <header>
      <div className={styles.container} data-testid={'header-container'}>
        <div className={styles.sandwichBlock} data-testid={'header-logo'}>
          <span className={styles.sandwich}>
            <Button
              variant={'sandwichIcon'}
              className={styles.sandwich}
              testid={'delete-btn'}
              clickAction={handleSandwichClick}
            />
          </span>
          <img className={styles.logo} src="../../assets/images/LOGO-RR-1.svg" alt="logo"></img>
          <img
            className={styles.isologo}
            src="../../assets/images/MegaRocket.svg"
            alt="IsoLogo"
          ></img>
        </div>
        <div className={styles.rightSide}>
          {role === 'ADMIN' && (
            <>
              <span className={styles.title}>Admin</span>
              <img
                onClick={handleLogout}
                className={styles.logout}
                src="../../assets/images/logout-icon.svg"
                alt="log out icon"
              ></img>
            </>
          )}
          {role === 'MEMBER' && (
            <>
              <span className={styles.title}>Member</span>
              <img
                onClick={handleLogout}
                className={styles.logout}
                src="../../assets/images/logout-icon.svg"
                alt="log out icon"
              ></img>
            </>
          )}
          {role === 'SUPER-ADMIN' && (
            <>
              <span className={styles.title}>Super Admin</span>
              <img
                onClick={handleLogout}
                className={styles.logout}
                src="../../assets/images/logout-icon.svg"
                alt="log out icon"
              ></img>
            </>
          )}
        </div>
      </div>
      {currentPath === homePath || currentPath === loginPath || currentPath === signupPath ? (
        ''
      ) : (
        <Nav />
      )}
    </header>
  );
}

export default Header;
