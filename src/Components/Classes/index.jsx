import { useState, useEffect } from 'react';
import Modal from 'Components/Shared/Modal';
import styles from './classes.module.css';
import Button from '../Shared/Button/index';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { getClasses, deleteClass } from '../../redux/classes/thunks';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'Components/Shared/Loader';

const Classes = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [message, setMessage] = useState('');
  const [currentId, setCurrentId] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const { classes, isLoading, error, serverMessage, success } = useSelector(
    (state) => state.classes
  );

  const deleteSingleClass = (_id) => {
    dispatch(deleteClass(_id));
    if (success) {
      setShowDeleteModal(false);
    }
  };

  const check = () => {
    if (success) {
      setMessage(serverMessage);
      setShowDeleteModal(false);
      setShowSuccessModal(true);
      dispatch(getClasses());
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 2000);
    }
  };
  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const reDirect = () => {
    history.push('/admin/classes');
    setShowDeleteModal(!showDeleteModal);
  };

  useEffect(() => {
    dispatch(getClasses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={`${styles.transparetnBlue} ${styles.loading}`}>
          <div className={styles.title}>
            <h2 className={styles.h2}>Classes</h2>
          </div>
          <div className={styles.loading}>{<Loader />}</div>
        </div>
      </div>
    );
  }

  if (error === true) {
    return (
      <div className={styles.container}>
        <div className={styles.transparetnBlue}>
          <div className={styles.title}>
            <h2 className={styles.h2}>Classes</h2>
          </div>
          <p className={styles.error}>{serverMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <div className={styles.transparetnBlue}>
        <div className={styles.title}>
          <h2 className={styles.h2}>Classes</h2>
          {location.pathname.includes('admin/classes') && (
            <Link to="/admin/classes/form">
              <Button variant={'add'} text={'Add'} testid={'add-btn'} />
            </Link>
          )}
        </div>
        <Modal
          title={message}
          isOpen={showSuccessModal}
          success
          onClose={() => {
            setShowSuccessModal(false);
          }}
          testid={'success-modal'}
        />
        <Modal
          isOpen={showDeleteSuccessModal}
          title={'Class deleted successfully!'}
          success
          onClose={() => setShowDeleteSuccessModal(!showDeleteSuccessModal)}
          testid={'success-delete-modal'}
        />
        <Modal
          isOpen={showDeleteModal}
          title={'Delete Class'}
          text={'Are you sure you want to delete this class?'}
          warning
          onClose={() => setShowDeleteModal(false)}
          testid={'confirm-modal'}
        >
          <Button
            text={'Delete'}
            type={'button'}
            variant={'delete'}
            clickAction={() => {
              deleteSingleClass(currentId);
            }}
            testid={'delete-btn'}
          />
          <Button text={'Cancel'} type={'button'} clickAction={reDirect} testid={'cancel-btn'} />
        </Modal>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={`${styles.large} ${styles.border}`}>Activity</th>
              <th className={`${styles.medium} ${styles.border}`}>Day</th>
              <th className={`${styles.small} ${styles.border}`}>Hour</th>
              <th className={`${styles.medium} ${styles.border}`}>Trainer</th>
              <th className={`${styles.small} ${styles.border}`}>Slots</th>
              {location.pathname.includes('admin/classes') && (
                <>
                  <th className={`${styles.small} ${styles.border}`}></th>
                  <th className={`${styles.small} ${styles.border}`}></th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {classes &&
              classes.map((theOne) => {
                return (
                  <tr className={styles.tr} key={theOne?._id}>
                    <td>{theOne?.activityId?.name}</td>
                    <td>{theOne?.day}</td>
                    <td>{theOne?.hour}</td>
                    <td>{theOne?.trainerId?.firstName}</td>
                    <td>{20 - theOne?.subscribers.length}</td>
                    {location.pathname.includes('admin/classes') && (
                      <td className={styles.tdBtn}>
                        <Link to={`/admin/classes/form/${theOne?._id}`}>
                          <Button text={'Edit Item'} variant={'edit'} testid={'edit-btn'} />
                        </Link>
                      </td>
                    )}
                    {location.pathname.includes('admin/classes') && (
                      <td className={styles.tdBtn}>
                        <Button
                          variant={'deleteIcon'}
                          type={'button'}
                          clickAction={() => {
                            setCurrentId(theOne?._id);
                            setShowDeleteModal(!showDeleteModal);
                          }}
                          testid={'delete-btn'}
                        />
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Classes;
