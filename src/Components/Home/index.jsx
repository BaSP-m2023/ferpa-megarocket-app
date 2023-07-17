import styles from './home.module.css';
import Landing from './Landing';

function Home() {
  return (
    <section className={styles.container}>
      <Landing />
    </section>
  );
}

export default Home;
