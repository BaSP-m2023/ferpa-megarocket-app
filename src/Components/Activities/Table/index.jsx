import styles from './table.module.css';
import { Link } from 'react-router-dom';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';
import { useState } from 'react';

const Table = ({
  activities,
  onDelete,
  message,
  confirmModal,
  deleteModal,
  setConfirmModal,
  setDeleteModal
}) => {
  const [currentID, setCurrentID] = useState('');

  return (
    <div className={styles.tableContainer}>
      <Modal
        warning
        isOpen={confirmModal}
        title={'Delete Activity'}
        text={'Are you sure you want to delete this activity?'}
        onClose={() => setConfirmModal(!confirmModal)}
      >
        <Button
          text={'Cancel'}
          variant={'white'}
          clickAction={() => setConfirmModal(!confirmModal)}
        />
        <Button text={'Delete'} variant={'delete'} clickAction={() => onDelete(currentID)} />
      </Modal>
      <Modal
        isOpen={deleteModal}
        title={message}
        success
        onClose={() => setDeleteModal(!deleteModal)}
      />
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
              <tr className={styles.trBody} key={activity?._id}>
                <td>{activity?.name}</td>
                <td className={styles.thDes}>{activity?.description}</td>
                <td className={styles.thStatus}>{activity?.isActive ? 'Active' : 'Inactive'}</td>
                <td className={styles.tdIcon}>
                  <Link to={`/activities/edit/${activity._id}`}>
                    <Button variant={'edit'} />
                  </Link>
                </td>
                <td>
                  <Button
                    variant={'deleteIcon'}
                    clickAction={() => {
                      setConfirmModal(!confirmModal);
                      setCurrentID(activity._id);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
