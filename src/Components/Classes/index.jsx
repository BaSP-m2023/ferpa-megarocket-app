import { useState, useEffect } from 'react';
import Modal from '../Shared/Modal';
import styles from './classes.module.css';
import Button from '../Shared/Button/index';
import { Link, useHistory } from 'react-router-dom';
import { getClasses, deleteClass } from '../../redux/classes/thunks';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../Components/Shared/Loader';

const Classes = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [message, setMessage] = useState('');
  const [currentId, setCurrentId] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

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
    history.push('/classes');
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
          <div className={styles.loading}>{<Loader />}</div>
        </div>
      </div>
    );
  }

  if (error === true) {
    return (
      <div className={styles.container}>
        <div className={styles.transparetnBlue}>
          <p className={styles.error}>{serverMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <div className={styles.onTop}>
        <h2>Classes</h2>
        <Modal
          title={message}
          isOpen={showSuccessModal}
          success
          onClose={() => {
            setShowSuccessModal(false);
          }}
        />
        <Link to={'./classes/form'}>
          <Button variant={'add'} text={'Add'} />
        </Link>
      </div>
      <div className={styles.transparetnBlue}>
        <div>
          <Modal
            isOpen={showDeleteSuccessModal}
            title={'Class deleted successfully!'}
            success
            onClose={() => setShowDeleteSuccessModal(!showDeleteSuccessModal)}
          />
          <Modal
            isOpen={showDeleteModal}
            title={'Delete'}
            text={'Are you sure you want to delete?'}
            warning
            onClose={() => setShowDeleteModal(false)}
          >
            <Button
              text={'Yes'}
              type={'button'}
              variant={'delete'}
              clickAction={() => {
                deleteSingleClass(currentId);
              }}
            />
            <Button text={'Cancel'} type={'button'} clickAction={reDirect} />
          </Modal>
          <table className={styles.table}>
            <div>
              <thead>
                <tr>
                  <th className={styles.large}>Activity Name</th>
                  <th className={styles.medium}>Day</th>
                  <th className={styles.small}>Hour</th>
                  <th className={styles.medium}>Trainer</th>
                  <th className={styles.small}>Slots</th>
                  <th className={styles.small}>Edit</th>
                  <th className={styles.small}>Delete</th>
                </tr>
              </thead>
            </div>
            <div className={styles.scroll}>
              <tbody>
                {classes &&
                  classes.map((theOne) => {
                    return (
                      <tr key={theOne?._id}>
                        <td className={styles.large}>{theOne?.activityId?.name}</td>
                        <td className={styles.medium}>{theOne?.day}</td>
                        <td className={styles.small}>{theOne?.hour}</td>
                        <td className={styles.medium}>{theOne?.trainerId?.firstName}</td>
                        <td className={styles.small}>{theOne?.slots}</td>
                        <td className={styles.small}>
                          <Link to={`/classes/form/${theOne?._id}`}>
                            <Button text={'Edit Item'} variant={'edit'} />
                          </Link>
                        </td>
                        <td className={styles.small}>
                          <Button
                            variant={'deleteIcon'}
                            type={'button'}
                            clickAction={() => {
                              setCurrentId(theOne?._id);
                              setShowDeleteModal(!showDeleteModal);
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
      </div>
    </section>
  );
};

export default Classes;
