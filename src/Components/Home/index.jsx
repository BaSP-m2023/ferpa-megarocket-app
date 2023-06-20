import styles from './home.module.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className={styles.container}>
      <h2>Home</h2>
      <Link to="members/home/profile">
        <button>Members</button>
      </Link>
      <Link to="admins/home/profile">
        <button>Admins</button>
      </Link>
    </section>
  );
}

export default Home;
