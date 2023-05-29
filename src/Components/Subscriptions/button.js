import styles from './subscriptions.module.css';

const Button = ({ onClick }) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      ADD Subs
    </button>
  );
};

export default Button;
