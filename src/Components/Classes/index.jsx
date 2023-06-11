import { useEffect, useState } from 'react';
import styles from './classes.module.css';
import { Link, useHistory } from 'react-router-dom';
import Button from '../Shared/Button/index';
import Modal from '../Shared/Modal';

const Classes = () => {
  const history = useHistory();
  const [classes, setClasses] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [currentId, setCurrentId] = useState('');

  useEffect(() => {
    getClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getClasses = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/`);
      const data = await res.json();
      setClasses(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteClass = async (_id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${_id}`, {
        method: 'DELETE'
      });
      setClasses([...classes.filter((justOne) => justOne._id !== _id)]);
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
              {classes.map((theOne) => {
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
