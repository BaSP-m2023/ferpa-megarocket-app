import styles from './subscriptions.module.css';

const Item = ({ subscription }) => {
  return (
    <tr className={styles.tr}>
      {/* <td>{subscription.classId}</td>
      <td>{subscription.memberId}</td> */}
      <td>Prueba1</td>
      <td>Prueba2</td>
      <td>{subscription.date}</td>
    </tr>
  );
};

export default Item;
