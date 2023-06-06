import { useEffect, useState } from 'react';
import styles from './classes.module.css';
import { Link, useHistory } from 'react-router-dom';
import Button from '../Shared/Button/index';
import Modal from '../Shared/Modal';

const Classes = () => {
  const history = useHistory();
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classes]);

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
      const justOne = classes.filter((justOne) => justOne._id === _id);
      alert(`${justOne[0].activityId.name} Class was deleted`);
      setClasses([...classes.filter((justOne) => justOne._id !== _id)]);
    } catch (error) {
      console.error(error);
    }
  };
  const reDirect = () => {
    history.push('/classes');
  };

  return (
    <section className={styles.container}>
      <div className={styles.transparetnBlue}>
        <h2>Classes</h2>
        <div>
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
                    <td>
                      {showModal && (
                        <Modal text={'Are you sure?'} warning>
                          <Button
                            text={'Yes'}
                            type={'button'}
                            clickAction={() => deleteClass(theOne?._id)}
                          />
                          <Button text={'Cancel'} type={'button'} clickAction={reDirect} />
                        </Modal>
                      )}
                      <Button
                        variant={'deleteIcon'}
                        type={'button'}
                        clickAction={() => {
                          setShowModal(true);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Link to={'./classes/form'}>
            <Button text={'Add'} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Classes;
