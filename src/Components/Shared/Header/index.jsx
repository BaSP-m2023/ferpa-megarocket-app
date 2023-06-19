import styles from './header.module.css';
import Nav from '../Nav';
import { useLocation, Link } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  const desiredPath = '/home';

  return (
    <header>
      <div className={styles.container}>
        <div>
          <img className={styles.logo} src="../../assets/images/LOGO-RR-1.svg" alt="logo"></img>
          <img
            className={styles.isologo}
            src="../../assets/images/MegaRocket.svg"
            alt="IsoLogo"
          ></img>
        </div>
        {location.pathname.includes('/admins/home') && (
          <div className={styles.rightSide}>
            <span className={styles.title}>Admins</span>
            <Link to="/home">
              <img
                className={styles.logout}
                src="../../assets/images/logout-icon.svg"
                alt="log out icon"
              ></img>
            </Link>
          </div>
        )}
        {location.pathname.includes('/members/home') && (
          <div className={styles.rightSide}>
            <span className={styles.title}>Members</span>
            <Link to="/home">
              <img
                className={styles.logout}
                src="../../assets/images/logout-icon.svg"
                alt="log out icon"
              ></img>
            </Link>
          </div>
        )}
      </div>
      {currentPath === desiredPath ? '' : <Nav />}
    </header>
  );
}

export default Header;
