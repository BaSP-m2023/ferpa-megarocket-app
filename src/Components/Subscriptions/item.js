import styles from './subscriptions.module.css';
import { FaPen } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';

const Item = ({ subscription, onDelete }) => {
  return (
    <tr className={styles.tr}>
      <td className={styles.td}>{subscription.classId?.activityId?.name}</td>
      <td className={styles.td}>{subscription.memberId?.lastName}</td>
      <td className={styles.td}>{subscription.date}</td>
      <td className={styles.td}>
        <FaPen style={{ color: 'white', cursor: 'pointer' }} />
      </td>
      <td className={styles.td}>
        <FaTrash
          style={{ color: 'white', cursor: 'pointer' }}
          onClick={() => onDelete(subscription._id)}
        />
      </td>
    </tr>
  );
};

export default Item;
