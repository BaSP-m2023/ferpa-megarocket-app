import styles from './header.module.css';
import Nav from '../Nav';
import Button from '../Button';
import { useHistory, useLocation } from 'react-router-dom';
import { logout } from 'redux/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { asideOnThunk, asideOffThunk } from 'redux/aside/thunks';
import { useEffect, useState } from 'react';
import Modal from '../Modal';

function Header() {
  const role = sessionStorage.getItem('role');
  const { user } = useSelector((state) => state.auth);
  const { isOn } = useSelector((state) => state.aside);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [logoutModal, setLogoutModal] = useState(false);

  const currentPath = location.pathname;
  const homePath = '/home';
  const loginPath = '/home/login';
  const signupPath = '/home/signup';

  useEffect(() => {
    dispatch(asideOffThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleLogout = async () => {
    await dispatch(logout());
    setLogoutModal(!logoutModal);
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
      <Modal
        isOpen={logoutModal}
        title={'Log out'}
        warning={true}
        onClose={() => {
          setLogoutModal(!logoutModal);
        }}
        text={'Are you sure that you want to log out?'}
        testid={'logout-modal'}
      >
        <Button
          text={'Confirm'}
          clickAction={() => {
            handleLogout();
          }}
          variant={'delete'}
          testid={'confirm-btn'}
        />
        <Button
          text={'Cancel'}
          clickAction={() => setLogoutModal(!logoutModal)}
          variant={'white'}
          testid={'cancel-btn'}
        />
      </Modal>
      <div className={styles.container} data-testid={'header-container'}>
        <div className={styles.sandwichBlock} data-testid={'header-logo'}>
          <span className={styles.sandwich}>
            {isOn ? (
              <Button
                variant={'exitIcon'}
                className={styles.sandwich}
                testid={'close-btn'}
                clickAction={handleSandwichClick}
              />
            ) : (
              <Button
                variant={'sandwichIcon'}
                className={styles.sandwich}
                testid={'sandwich-btn'}
                clickAction={handleSandwichClick}
              />
            )}
          </span>
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
              onClick={() => setLogoutModal(!logoutModal)}
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
              onClick={() => setLogoutModal(!logoutModal)}
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
