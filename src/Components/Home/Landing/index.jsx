import React from 'react';
import styles from './landing.module.css';

const Landing = () => {
  return (
    <div className={styles.container}>
      <section className={styles.introduction}></section>
      <section className={styles.meetUs}></section>
      <section className={styles.contactUs}></section>
      <section className={styles.aboutUs}></section>
      <section className={styles.membership}></section>
    </div>
  );
};

export default Landing;
