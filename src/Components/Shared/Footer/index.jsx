import styles from './footer.module.css';
import React from 'react';

function Footer() {
  return (
    <footer className={styles.container} data-testid={'footer-container'}>
      <div className={styles.license}>
        <div>
          <a
            href={'https://twitter.com/radiumrocket'}
            target={'_blank'}
            rel="noreferrer"
            data-testid={'tw-link'}
          >
            <img
              alt={'Twitter'}
              className={styles.socialIcon}
              src={'../../assets/images/Twitter-Icon.svg'}
            />
          </a>
          <a
            href={'https://www.instagram.com/radium.rocket/'}
            target={'_blank'}
            rel="noreferrer"
            data-testid={'ig-link'}
          >
            <img
              alt={'Instagram'}
              className={styles.socialIcon}
              src={'../../assets/images/Instagram-Icon.svg'}
            />
          </a>
          <a
            href={'https://www.facebook.com/radiumrocket'}
            target={'_blank'}
            rel="noreferrer"
            data-testid={'fb-link'}
          >
            <img
              alt={'facebook'}
              className={styles.socialIcon}
              src={'../../assets/images/Facebook-Logo.svg'}
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
