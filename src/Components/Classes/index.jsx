import { useState, useEffect } from 'react';
import styles from './classes.module.css';
import { Link, useHistory } from 'react-router-dom';
import Button from '../Shared/Button/index';
import Modal from '../Shared/Modal';
import { getClasses } from '../../redux/classes/thunks';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Loader from '../../Components/Shared/Loader';

const Classes = () => {
  const history = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState('');

  const { classes, isLoading, error } = useSelector((state) => state.classes);

  const deleteClass = async (_id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${_id}`, {
        method: 'DELETE'
      });
      setShowDeleteModal(!showDeleteModal);
      setShowDeleteSuccessModal(!showDeleteSuccessModal);
      setTimeout(() => {
        setShowDeleteSuccessModal(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const reDirect = () => {
    history.push('/classes');
    setShowDeleteModal(!showDeleteModal);
  };

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>{<Loader />}</div>
      </div>
    );
  }

  if (error !== '') {
    return <p className={`${styles.container} ${styles.error}`}>{error}</p>;
  }

  return (
    <section className={styles.container}>
      <div className={styles.onTop}>
        <h2>Classes</h2>
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
            title={'Are you sure?'}
            warning
            onClose={() => setShowDeleteModal(!showDeleteModal)}
          >
            <Button
              text={'Yes'}
              type={'button'}
              clickAction={() => {
                deleteClass(currentId);
              }}
            />
            <Button text={'Cancel'} type={'button'} clickAction={reDirect} />
          </Modal>
          <table className={styles.table}>
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
                        <Modal
                          isOpen={showDeleteSuccessModal}
                          text={'Class deleted successfully!!!!!'}
                          success
                          onClose={() => setShowDeleteSuccessModal(!showDeleteSuccessModal)}
                        />
                        <Modal
                          isOpen={showDeleteModal}
                          text={'Are you sure?'}
                          warning
                          onClose={() => setShowDeleteModal(!showDeleteModal)}
                        >
                          <Button
                            text={'Yes'}
                            type={'button'}
                            clickAction={() => {
                              deleteClass(theOne?._id);
                            }}
                          />
                          <Button text={'Cancel'} type={'button'} clickAction={reDirect} />
                        </Modal>
                        <Button
                          variant={'deleteIcon'}
                          type={'button'}
                          clickAction={() => {
                            setShowDeleteModal(true);
                            setCurrentId(theOne?._id);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Classes;
