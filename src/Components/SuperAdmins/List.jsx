import { Link } from 'react-router-dom';
import styles from './super-admins.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';

// const toggler = (id) => {
//   let newToggle = [...togglePass];
//   if (newToggle.includes(id)) {
//     newToggle = newToggle.filter((index) => index !== id);
//   } else {
//     newToggle.push(id);
//   }
//   setTogglePass(newToggle);
// };

const List = ({
  superadmins,
  deleteItem,
  message,
  confirmModal,
  deleteModal,
  setConfirmModal,
  setDeleteModal
}) => {
  return (
    <table className={styles.table}>
      <tbody className={styles.tbody}>
        <tr className={styles.tr}>
          <th className={styles.thEmail}>Email:</th>
          <th className={styles.thPass}>Password:</th>
        </tr>
        {superadmins.map((superadmin) => {
          return (
            <>
              <Modal
                warning
                isOpen={confirmModal}
                title={'Delete SuperAdmin'}
                text={'Are you sure you want to delete this SuperAdmin?'}
                onClose={() => setConfirmModal(!confirmModal)}
              >
                <Button
                  text={'Cancel'}
                  type={'white'}
                  clickAction={() => setConfirmModal(!confirmModal)}
                />
                <Button
                  text={'Delete'}
                  type={'delete'}
                  clickAction={() => deleteItem(superadmin._id)}
                />
              </Modal>
              <Modal
                isOpen={deleteModal}
                title={message}
                success
                onClose={() => setDeleteModal(!deleteModal)}
              />
              <tr key={superadmin?._id} className={styles.trBody}>
                <td className={styles.thEmail}>{superadmin?.email}</td>
                <td className={styles.thPass}>{superadmin?.password}</td>
                <td>
                  <Button type={'seePassword'} />
                </td>
                <td className={styles.tdIcon}>
                  <Link to={`/super-admins/edit/${superadmin._id}`}>
                    <Button type={'edit'} />
                  </Link>
                </td>
                <td>
                  <Button type={'deleteIcon'} clickAction={() => setConfirmModal(!confirmModal)} />
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
};

export default List;
