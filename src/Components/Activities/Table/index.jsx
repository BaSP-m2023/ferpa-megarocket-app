import styles from './table.module.css';
import { Link } from 'react-router-dom';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';

const Table = ({
  activities,
  onDelete,
  message,
  confirmModal,
  deleteModal,
  setConfirmModal,
  setDeleteModal
}) => {
  return (
    <table className={styles.table}>
      <tbody className={styles.tbody}>
        <tr className={styles.trHead}>
          <th className={styles.thName}>Activity</th>
          <th className={styles.thDes}>Description</th>
          <th className={styles.thStatus}>Status</th>
          <th className={styles.thIcon}></th>
          <th className={styles.thIcon}></th>
        </tr>
        {activities.map((activity) => {
          return (
            <>
              <Modal
                warning
                isOpen={confirmModal}
                title={'Delete Activity'}
                text={'Are you sure you want to delete this activity?'}
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
                  clickAction={() => onDelete(activity._id)}
                />
              </Modal>
              <Modal
                isOpen={deleteModal}
                title={message}
                success
                onClose={() => setDeleteModal(!deleteModal)}
              />
              <tr className={styles.trBody} key={activity?._id}>
                <td>{activity?.name}</td>
                <td className={styles.thDes}>{activity?.description}</td>
                <td className={styles.thStatus}>{activity?.isActive ? 'Active' : 'Inactive'}</td>
                <td className={styles.tdIcon}>
                  <Link to={`/activities/edit/${activity._id}`}>
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

export default Table;
