import { useEffect, useState } from 'react';
import styles from './subscriptions.module.css';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import { Link } from 'react-router-dom';

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);

  /*
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [classId, setClassId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [date, setDate] = useState('');
  const [currentClassId, setCurrentClassId] = useState('');
  const [currentMemberId, setCurrentMemberId] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  */
  const [currentId, setCurrentId] = useState('');

  const [modalDelete, setModalDelete] = useState(false);
  const [modalConfirmDel, setModalConfirmDel] = useState(false);

  const onDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      setSubscriptions(subscriptions.filter((subscription) => subscription._id !== id));
      setModalConfirmDel(!modalConfirmDel);
      setModalDelete(!modalDelete);
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
  /*

  const onEdit = async (id) => {
    const index = subscriptions.findIndex((subscription) => subscription._id === id);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          classId: currentClassId,
          memberId: currentMemberId,
          date: currentDate
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      const updatedSubscription = {
        _id: data.data._id,
        classId: {
          activityId: {
            name: classes.find((item) => item._id === data.data.classId).activityId?.name
          }
        },
        memberId: {
          lastName: members.find((item) => item._id === data.data.memberId).lastName
        },
        date: data.data.date
      };
      const update = [...subscriptions];
      update[index] = updatedSubscription;
      setSubscriptions(update);
    } catch (error) {
      console.error(error);
    }
  };

  */ useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <section className={styles.container}>
      <Modal
        isOpen={modalDelete}
        title={'Subscription deleted'}
        success={true}
        onClose={() => setModalDelete(!modalDelete)}
      ></Modal>
      <Modal
        isOpen={modalConfirmDel}
        title={'Warning'}
        onClose={() => setModalConfirmDel(!modalConfirmDel)}
        text={'Are you sure?'}
      >
        <Button text={'Confirm'} clickAction={() => onDelete(currentId)} type={'delete'} />
        <Button
          text={'Cancel'}
          clickAction={() => setModalConfirmDel(!modalConfirmDel)}
          type={'white'}
        />
      </Modal>

      <section className={styles.list}>
        <div className={styles.header}>
          <h2 className={styles.title}>Subscriptions</h2>
          <Link to={'/subscriptions/form'}>
            <Button text={'ADD Subs'} type={'add'} />
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
                    <Button type={'edit'} />
                  </Link>
                </td>
                <td className={styles.td}>
                  <Button
                    type={'deleteIcon'}
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
