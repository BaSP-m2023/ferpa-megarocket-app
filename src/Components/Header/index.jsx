import styles from './header.module.css';

function Header() {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.brand}>
          <img className={styles.logo} src="../assets/images/LOGO-RR-1.svg" alt="logo"></img>
          <img className={styles.isologo} src="../assets/images/MegaRocket.svg" alt="isologo"></img>
        </div>
      </div>
    </header>
  );
}

export default Header;
