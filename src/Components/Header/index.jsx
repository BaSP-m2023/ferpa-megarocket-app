import styles from './header.module.css';
import Nav from '../Shared/Header/Nav';

function Header() {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.brand}>
          <img className={styles.logo} src="../assets/images/LOGO-RR-1.svg" alt="logo"></img>
          <img className={styles.isologo} src="../assets/images/MegaRocket.svg" alt="isologo"></img>
        </div>
      </div>
<<<<<<< HEAD
=======
      <Nav />
>>>>>>> origin
    </header>
  );
}

export default Header;
