import React from 'react';
import styles from './home.module.css';

const MembersHome = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.header}>Hello Pepito!</h2>
      <div className={styles.body}>
        <div>
          <p>Some gym stuff?</p>
        </div>
        <div>
          <p>Also, some gym info</p>
        </div>
      </div>
    </section>
  );
};

export default MembersHome;
