import styles from './header.module.css';
import Nav from './Nav/index';

function Header() {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.brand}>
          <img className={styles.logo} src="../assets/images/LOGO-RR-1.svg" alt="Logo"></img>
          <img className={styles.isologo} src="../assets/images/MegaRocket.svg" alt="IsoLogo"></img>
        </div>
      </div>
      <Nav />
    </header>
  );
}

export default Header;
