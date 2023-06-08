import { useEffect, useState } from 'react';
import styles from './trainers.module.css';
import { Link } from 'react-router-dom';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';

const Trainers = () => {
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
      alert(error);
    }
  };

  useEffect(() => {
    getTrainers();
  }, []);

  return (
    <section className={styles.container}>
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
              <th>Last Name</th>
              <th>Dni</th>
              <th>Phone</th>
              <th>Email</th>
              <th>City</th>
              <th>Password</th>
              <th>Salary</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.dni}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.city}</td>
                  <td>{item.password}</td>
                  <td>{item.salary}</td>
                  <td>
                    <Link to={`/trainers/Form/${item._id}`}>
                      <Button variant={'edit'} />
                    </Link>
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
                      <Button
                        text={'Delete'}
                        variant={'delete'}
                        clickAction={() => deleteTrainer(item._id)}
                      />
                    </Modal>
                    <Modal
                      success
                      isOpen={successModal}
                      onClose={() => setSuccessModal(!successModal)}
                      title={'Trainer Deleted successfully'}
                    ></Modal>
                    <Button
                      variant={'deleteIcon'}
                      clickAction={() => setDeleteModal(!deleteModal)}
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
