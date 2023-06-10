import { useEffect, useState } from 'react';
import styles from './trainers.module.css';
import { Link } from 'react-router-dom';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';

const Trainers = () => {
  const [currentId, setCurrentId] = useState('');
  const [successModal, setSuccessModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [trainers, setTrainers] = useState([]);
  const getTrainers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers`);
      const data = await response.json();
      setTrainers(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTrainer = async (_id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/${_id}`, {
        method: 'DELETE'
      });
      const { message, error } = await response.json();
      if (!error) {
        setTrainers([...trainers.filter((trainer) => trainer._id !== _id)]);
      } else {
        throw message;
      }
      setDeleteModal(!deleteModal);
      setSuccessModal(!successModal);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTrainers();
  }, []);

  return (
    <section className={styles.container}>
      <Modal
        warning
        isOpen={deleteModal}
        onClose={() => setDeleteModal(!deleteModal)}
        title={'Delete Trainer'}
        text={'Are you sure you want to delete this Trainer?'}
      >
        <Button
          text={'Cancel'}
          variant={'white'}
          clickAction={() => setDeleteModal(!deleteModal)}
        />
        <Button text={'Delete'} variant={'delete'} clickAction={() => deleteTrainer(currentId)} />
      </Modal>
      <Modal
        success
        isOpen={successModal}
        onClose={() => setSuccessModal(!successModal)}
        title={'Trainer Deleted successfully'}
      ></Modal>
      <div className={styles.header}>
        <div className={styles.inside}>
          <h2 className={styles.title}>Trainers</h2>
          <Link to={'/trainers/Form'}>
            <Button text={'add trainer'} variant={'add'} />
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th className={styles.titles}>Name</th>
              <th className={styles.titles}>Last Name</th>
              <th className={styles.titles}>Dni</th>
              <th className={styles.titles}>Phone</th>
              <th className={styles.titles}>Email</th>
              <th className={styles.titles}>City</th>
              <th className={styles.titles}>Password</th>
              <th className={styles.titles}>Salary</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((item) => {
              return (
                <tr key={item._id}>
                  <td className={styles.list}>{item.firstName}</td>
                  <td className={styles.list}>{item.lastName}</td>
                  <td className={styles.list}>{item.dni}</td>
                  <td className={styles.list}>{item.phone}</td>
                  <td className={styles.list}>{item.email}</td>
                  <td className={styles.list}>{item.city}</td>
                  <td className={styles.list}>{item.password}</td>
                  <td className={styles.list}>{item.salary}</td>
                  <td>
                    <Link to={`/trainers/Form/${item._id}`}>
                      <Button variant={'edit'} />
                    </Link>
                    <Button
                      variant={'deleteIcon'}
                      clickAction={() => {
                        setDeleteModal(!deleteModal);
                        setCurrentId(item._id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Trainers;
