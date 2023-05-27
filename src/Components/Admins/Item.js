import styles from './admins.module.css';

const Item = ({ admin, deleteAdmin }) => {
  return (
    <tr className={styles.tr}>
      <td>{admin.firstName}</td>
      <td>{admin.city}</td>
      <td>{admin.email}</td>
      <td></td>
      <td className={styles.icons}>
        <img src="/assets/images/edit-icon.svg" />
        <img src="/assets/images/delete-icon.svg" onClick={() => deleteAdmin(admin._id)} />
      </td>
    </tr>
  );
};

export default Item;
