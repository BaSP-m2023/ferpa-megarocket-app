import { useHistory, useLocation } from 'react-router-dom';
import { logout } from 'redux/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';
import styles from './header.module.css';
import Nav from '../Nav';

function Header() {
  const role = sessionStorage.getItem('role');
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const currentPath = location.pathname;
  const homePath = '/home';
  const loginPath = '/home/login';
  const signupPath = '/home/signup';

  const handleLogout = async () => {
    await dispatch(logout());
    history.push('/home');
  };

  return (
    <header>
      <div className={styles.container} data-testid={'header-container'}>
        <div data-testid={'header-logo'}>
          <img className={styles.logo} src="../../assets/images/LOGO-RR-1.svg" alt="logo"></img>
          <img
            className={styles.isologo}
            src="../../assets/images/MegaRocket.svg"
            alt="IsoLogo"
          ></img>
        </div>
        {role && role !== 'SUPER-ADMIN' && (
          <div className={styles.rightSide} data-testid={'logout-container'}>
            <span className={styles.title}>Hi, {user?.firstName}</span>
            <img
              onClick={handleLogout}
              className={styles.logout}
              src="../../assets/images/logout-icon.svg"
              alt="log out icon"
              data-testid={'logout-logo'}
            ></img>
          </div>
        )}
        {role === 'SUPER-ADMIN' && (
          <div className={styles.rightSide}>
            <span className={styles.title}>Hi, Super Admin</span>
            <img
              onClick={handleLogout}
              className={styles.logout}
              src="../../assets/images/logout-icon.svg"
              alt="log out icon"
            ></img>
          </div>
        )}
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
