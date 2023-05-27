import styles from './admins.module.css';

const Button = ({ onclick, color, text }) => {
  return (
    <button style={{ backgroundColor: `${color}` }} onClick={onclick} className={styles.btn}>
      {text}
    </button>
  );
};

export default Button;
