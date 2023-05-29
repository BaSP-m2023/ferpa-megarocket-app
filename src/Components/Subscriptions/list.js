import styles from './subscriptions.module.css';
import Table from './table';
import Button from './button';

const List = ({ subscriptions, onDelete }) => {
  return (
    <section className={styles.list}>
      <header className={styles.header}>
        <h1 className={styles.title}>Subscriptions</h1>
        <Button />
      </header>
      <Table subscriptions={subscriptions} onDelete={onDelete} />
    </section>
  );
};

export default List;
