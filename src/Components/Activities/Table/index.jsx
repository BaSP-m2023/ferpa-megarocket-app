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
        <div>
          <thead className={styles.tHead}>
            <tr className={styles.trHead}>
              <th className={styles.thName}>Activity</th>
              <th className={styles.thDes}>Description</th>
              <th className={styles.thStatus}>Status</th>
              <th className={styles.thIcon}></th>
              <th className={styles.thIcon}></th>
            </tr>
          </thead>
        </div>
        <div className={styles.scroll}>
          <tbody className={styles.tbody}>
            {data.map((activity) => {
              return (
                <tr className={styles.trBody} key={activity?._id}>
                  <td className={styles.thName}>{activity?.name}</td>
                  <td className={styles.thDes}>{activity?.description}</td>
                  <td className={styles.thStatus}>{activity?.isActive ? 'Active' : 'Inactive'}</td>
                  <td className={styles.tdIcon}>
                    <Link to={`/activities/edit/${activity._id}`}>
                      <Button variant={'edit'} />
                    </Link>
                  </td>
                  <td className={styles.tdIcon}>
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
        </div>
      </table>
    </div>
  );
};

export default Table;
