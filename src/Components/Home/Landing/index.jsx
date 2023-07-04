import React from 'react';
import styles from './landing.module.css';

const Landing = () => {
  return (
    <div className={styles.container}>
      <section className={styles.introduction}>
        <div className={styles.introductionBox}>
          <h1>MegaRocket GYM</h1>
          <h3>Launch your fitness journey with MegaRocket</h3>
          <p>
            Welcome to Megarocket SA, where we believe in creating a holistic approach to fitness.
            Our gym is a state-of-the-art facility that caters to all your fitness needs. Whether
            you are looking to build muscle, increase flexibility, or simply stay healthy, we have
            everything you need to reach your goals. Our gym is equipped with the latest fitness
            equipment, including cardio machines, weightlifting equipment, and functional training
            areas. We also offer personalized training programs tailored to your specific fitness
            goals, whether you are a beginner or a seasoned athlete. At Megarocket SA, we believe
            that fitness is a lifestyle, not just a hobby. Join us today and start your journey
            towards a healthier, happier you.
          </p>
        </div>
        <div className={styles.introductionImg}>
          <img
            className={styles.logo}
            src="../../assets/images/introduction-img.svg"
            alt="workout"
          ></img>
        </div>
      </section>
      <section className={styles.meetUs}>
        <div className={styles.meetUsTitle}>
          <h2>Meet Us</h2>
        </div>
        <div className={styles.meetUpBox}>
          <div className={styles.topBox}>
            <div className={styles.box}></div>
            <div className={styles.box}></div>
          </div>
          <div className={styles.bottomBox}>
            <div className={styles.box}></div>
            <div className={styles.box}></div>
          </div>
        </div>
      </section>
      <section className={styles.contactUs}></section>
      <section className={styles.aboutUs}></section>
      <section className={styles.membership}></section>
    </div>
  );
};

export default Landing;
