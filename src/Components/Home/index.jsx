import styles from './home.module.css';
import Aside from '../Shared/Aside';
import Landing from './Landing';
import { useSelector } from 'react-redux';

function Home() {
  const { isOn } = useSelector((state) => state.aside);

  return (
    <section className={styles.container}>
      {isOn && <Aside />}
      <Landing />
    </section>
  );
}

export default Home;
