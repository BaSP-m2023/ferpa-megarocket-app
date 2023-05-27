import styles from './subscriptions.module.css';
import Table from './table';

const List = ({ subscriptions }) => {
  return (
    <section className={styles.list}>
      <header className={styles.header}>
        <h1 className={styles.title}>Subscriptions</h1>
        <button className={styles.btn}>ADD Subs</button>
      </header>
      <Table subscriptions={subscriptions} />
    </section>
  );
};

export default List;
