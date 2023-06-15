import { useEffect, useState } from 'react';
import styles from './subscriptions.module.css';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptions, selectId, deleteSubscriptions } from '../../redux/subscriptions/thunks';
import Loader from '../Shared/Loader';

function Subscriptions() {
  const location = useLocation();
  const { subs, isPending, error, id, message } = useSelector((state) => state.subscriptions);
  const dispatch = useDispatch();
  const history = useHistory();
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalConfirmDel, setModalConfirmDel] = useState(false);

  useEffect(() => {
    if (location.state) {
      history.replace({ ...history.location, state: undefined });
      setModalSuccess(!modalSuccess);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (modalSuccess) {
      setTimeout(() => {
        setModalSuccess(!modalSuccess);
      }, 2000);
    }
  }, [modalSuccess]);

  useEffect(() => {
    getSubscriptions(dispatch);
  }, [dispatch]);

  return (
    <section className={styles.container}>
      <Modal
        isOpen={modalSuccess}
        title={message}
        success
        onClose={() => setModalSuccess(!modalSuccess)}
      ></Modal>
      <Modal
        isOpen={modalConfirmDel}
        title={'Warning'}
        onClose={() => {
          setModalConfirmDel(!modalConfirmDel);
        }}
        text={'Are you sure that you want to delete this subscription?'}
      >
        <Button
          text={'Confirm'}
          clickAction={() => {
            deleteSubscriptions(dispatch, id);
            setModalConfirmDel(!modalConfirmDel);
            setModalSuccess(true);
          }}
          variant={'delete'}
        />
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
          <thead>
            <tr className={styles.trHead}>
              <th className={styles.thead}>Activity</th>
              <th className={styles.thead}>Trainer</th>
              <th className={styles.thead}>Member</th>
              <th className={styles.thead}>Date</th>
              <th className={styles.tdBtn}></th>
              <th className={styles.tdBtn}></th>
            </tr>
          </thead>
          {isPending ? (
            ''
          ) : (
            <tbody>
              {subs &&
                subs.map((subscription) => (
                  <tr key={subscription._id} className={styles.tr}>
                    <td className={styles.td}>{subscription.classId?.activityId?.name}</td>
                    <td className={styles.td}>{subscription.classId?.trainerId?.lastName}</td>
                    <td className={styles.td}>
                      {subscription.memberId?.lastName}, {subscription.memberId?.firstName}
                    </td>
                    <td className={styles.td}>{subscription.date.slice(0, 10)}</td>
                    <td className={styles.tdBtn}>
                      <Link to={`/subscriptions/form/${subscription._id}`}>
                        <Button
                          variant={'edit'}
                          clickAction={() => selectId(dispatch, subscription._id)}
                        />
                      </Link>
                    </td>
                    <td className={styles.tdBtn}>
                      <Button
                        variant={'deleteIcon'}
                        clickAction={() => {
                          selectId(dispatch, subscription._id);
                          setModalConfirmDel(!modalConfirmDel);
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          )}
        </table>
        {isPending ? (
          <div className={styles.loading}>
            <Loader />
          </div>
        ) : (
          ''
        )}
        {error !== '' ? <p>{error}</p> : ''}
      </section>
    </section>
  );
}

export default Subscriptions;
