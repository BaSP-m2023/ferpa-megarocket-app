import styles from './admins.module.css';
import Item from './Item';

const Table = ({ admins, deleteAdmin }) => {
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
          <Item key={admin._id} admin={admin} deleteAdmin={deleteAdmin} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
