import styles from './admins.module.css';
import Item from './Item';

const Table = ({ admins }) => {
  return (
    <table className={styles.table}>
      <tbody className={styles.tbody}>
        <tr className={styles.thead}>
          <th>Name</th>
          <th>City</th>
          <th>Email</th>
          <th></th>
          <th></th>
        </tr>
        {admins.map((admin) => (
          <Item key={admin._id} admin={admin} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
