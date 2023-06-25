import styles from './table.module.css';
import { Link } from 'react-router-dom';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';
import { useState, useEffect } from 'react';
import { deleteActivity } from '../../../redux/activities/thunks';
import { useDispatch, useSelector } from 'react-redux';

const Table = () => {
  const { data, message, success } = useSelector((state) => state.activities);
  const [modalMessage, setModalMessage] = useState('');
  const [currentID, setCurrentID] = useState('');
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const dispatch = useDispatch();

  const handleModal = () => {
    setDeleteModal(!deleteModal);
    setTimeout(() => {
      setDeleteModal();
    }, 2000);
  };

  useEffect(() => {
    if (success) {
      handleModal();
      setModalMessage(message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          text={'Delete'}
          variant={'delete'}
          clickAction={() => deleteActivity(dispatch, currentID)}
        />
        <Button
          text={'Cancel'}
          variant={'white'}
          clickAction={() => setConfirmModal(!confirmModal)}
        />
      </Modal>
      <Modal
        isOpen={deleteModal}
        title={modalMessage}
        success
        onClose={() => setDeleteModal(!deleteModal)}
      />
      <table className={styles.table}>
        <thead className={styles.tHead}>
          <tr className={styles.trHead}>
            <th className={styles.thName}>Activity</th>
            <th className={styles.thDes}>Description</th>
            <th className={styles.thStatus}>Status</th>
            <th className={styles.tdBtn}></th>
            <th className={styles.tdBtn}></th>
          </tr>
        </thead>

        <tbody className={styles.tbody}>
          {data.map((activity) => {
            return (
              <tr className={styles.tr} key={activity?._id}>
                <td className={styles.thName}>{activity?.name}</td>
                <td className={styles.thDes}>{activity?.description}</td>
                <td className={styles.thStatus}>{activity?.isActive ? 'Active' : 'Inactive'}</td>
                <td className={styles.tdBtn}>
                  <Link to={`/admins/activities/edit/${activity._id}`}>
                    <Button variant={'edit'} testid={'edit-btn'} />
                  </Link>
                </td>
                <td className={styles.tdBtn}>
                  <Button
                    variant={'deleteIcon'}
                    clickAction={() => {
                      setConfirmModal(!confirmModal);
                      setCurrentID(activity._id);
                    }}
                    testid={'delete-btn'}
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
