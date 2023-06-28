import styles from './home.module.css';
import Aside from '../Shared/Aside';
import Landing from './Landing';

function Home() {
  return (
    <section className={styles.container}>
      <Aside />
      <Landing />
    </section>
  );
}

export default Home;
