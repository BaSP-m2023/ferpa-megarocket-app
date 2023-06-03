import styles from './footer.module.css';
import React from 'react';

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.license}>
        <div>
          <a href={'https://twitter.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <img
              alt={'twitter'}
              className={styles.socialIcon}
              src={'./assets/images/TwitterIcon.svg'}
            />
          </a>
          <a href={'https://www.instagram.com/radium.rocket/'} target={'_blank'} rel="noreferrer">
            <img
              alt={'instagram'}
              className={styles.socialIcon}
              src={'./assets/images/InstagramIcon.svg'}
            />
          </a>
          <a href={'https://www.facebook.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <img
              alt={'facebook'}
              className={styles.socialIcon}
              src={'./assets/images/FacebookLogo.svg'}
            />
          </a>
        </div>
        <div className={styles.copyright}>
          Copyright © {new Date().getFullYear()} MegaRocket S.A. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
