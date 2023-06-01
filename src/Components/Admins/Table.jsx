import styles from './admins.module.css';

const Table = ({ admins, deleteAdmin, onEdit }) => {
  return (
    <table className={styles.table}>
      <tbody className={styles.tbody}>
        <tr className={styles.thead}>
          <th className={styles.th}>Name</th>
          <th className={styles.th}>City</th>
          <th className={styles.th}>Email</th>
          <th className={styles.th}></th>
          <th className={styles.th}></th>
        </tr>
        {admins.map((admin) => {
          return (
            <tr className={styles.tr} key={admin._id}>
              <td className={styles.td}>{admin.firstName}</td>
              <td className={styles.td}>{admin.city}</td>
              <td className={styles.td}>{admin.email}</td>
              <td className={styles.td}></td>
              <td className={styles.icons}>
                <img
                  alt="edit-icon"
                  src="/assets/images/edit-icon.svg"
                  onClick={() => onEdit(admin)}
                />
                <img
                  alt="delete-icon"
                  src="/assets/images/delete-icon.svg"
                  onClick={() => deleteAdmin(admin._id)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
