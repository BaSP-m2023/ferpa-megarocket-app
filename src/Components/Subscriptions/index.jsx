import { useEffect, useState } from 'react';
import styles from './subscriptions.module.css';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import { Link, useLocation } from 'react-router-dom';

function Subscriptions() {
  const location = useLocation();
  const [subscriptions, setSubscriptions] = useState([]);
  const [currentId, setCurrentId] = useState('');

  const [modalSucess, setModalSucess] = useState(false);
  const [modalSucessTitle, setModalSucessTitle] = useState('');
  const [modalConfirmDel, setModalConfirmDel] = useState(false);

  const onDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      setSubscriptions(subscriptions.filter((subscription) => subscription._id !== id));
      setModalConfirmDel(!modalConfirmDel);
      setModalSucessTitle(data.message);
      setModalSucess(true);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getSubscriptions = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/all`);
      const { data } = await res.json();
      setSubscriptions(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (location.state) {
      setModalSucessTitle(location.state.message);
      setModalSucess(!modalSucess);
    }
    getSubscriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.container}>
      <Modal
        isOpen={modalSucess}
        title={modalSucessTitle}
        success
        onClose={() => setModalSucess(!modalSucess)}
      ></Modal>
      <Modal
        isOpen={modalConfirmDel}
        title={'Warning'}
        onClose={() => setModalConfirmDel(!modalConfirmDel)}
        text={'Are you sure?'}
      >
        <Button text={'Confirm'} clickAction={() => onDelete(currentId)} variant={'delete'} />
        <Button
          text={'Cancel'}
          clickAction={() => setModalConfirmDel(!modalConfirmDel)}
          variant={'white'}
        />
      </Modal>

      <section className={styles.list}>
        <div className={styles.header}>
          <h2 className={styles.title}>Subscriptions</h2>
          <Link to={'/subscriptions/form'}>
            <Button text={'ADD Subs'} variant={'add'} />
          </Link>
        </div>
        <table className={styles.table}>
          <tbody className={styles.tbody}>
            <tr className={styles.tr}>
              <th className={styles.thead}>Activity</th>
              <th className={styles.thead}>Trainer</th>
              <th className={styles.thead}>Member</th>
              <th className={styles.thead}>Date</th>
            </tr>
            {subscriptions.map((subscription) => (
              <tr key={subscription._id} className={styles.tr}>
                <td className={styles.td}>{subscription.classId?.activityId?.name}</td>
                <td className={styles.td}>{subscription.classId?.trainerId?.lastName}</td>
                <td className={styles.td}>
                  {subscription.memberId?.lastName}, {subscription.memberId?.firstName}
                </td>
                <td className={styles.td}>{subscription.date.slice(0, 10)}</td>
                <td className={styles.td}>
                  <Link to={`/subscriptions/form/${subscription._id}`}>
                    <Button variant={'edit'} />
                  </Link>
                </td>
                <td className={styles.td}>
                  <Button
                    variant={'deleteIcon'}
                    clickAction={() => {
                      setCurrentId(subscription._id);
                      setModalConfirmDel(!modalConfirmDel);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
}

export default Subscriptions;
