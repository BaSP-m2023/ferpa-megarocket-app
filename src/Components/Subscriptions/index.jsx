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

  if (isPending) {
    return (
      <section className={styles.container}>
        <section className={styles.listLoading}>
          <div className={styles.headerLoading}>
            <h2 className={styles.h2}>Subscriptions</h2>
          </div>
          <div className={styles.loading}>{<Loader />}</div>
        </section>
      </section>
    );
  }
  if (error) {
    return (
      <section className={styles.container}>
        <section className={styles.list}>
          <div className={styles.headerLoading}>
            <h2 className={styles.h2}>Subscriptions</h2>
          </div>
          <p className={styles.centered}>{message}</p>
        </section>
      </section>
    );
  }
  if (!error && !isPending) {
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
          title={'Delete Subscription'}
          warning={true}
          onClose={() => {
            setModalConfirmDel(!modalConfirmDel);
          }}
          text={'Are you sure that you want to delete this subscription?'}
          data-testid={'confirm-modal'}
        >
          <Button
            text={'Delete'}
            clickAction={() => {
              deleteSubscriptions(dispatch, id);
              setModalConfirmDel(!modalConfirmDel);
              setModalSuccess(true);
            }}
            variant={'delete'}
            testid={'delete-btn'}
          />
          <Button
            text={'Cancel'}
            clickAction={() => setModalConfirmDel(!modalConfirmDel)}
            variant={'white'}
            testid={'cancel-btn'}
          />
        </Modal>
        <section className={styles.list} data-testid={'subs-table-container'}>
          <div className={styles.header}>
            <h2 className={styles.title}>Subscriptions</h2>
            <Link to={`/admin/subscriptions/form`}>
              <Button variant={'add'} text={'New Subscription'} testid={'add-btn'} />
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
              </tr>
            </thead>
            <tbody>
              {subs.map((subscription) => (
                <tr key={subscription._id} className={styles.tr}>
                  <td className={styles.td}>{subscription.classId?.activityId?.name}</td>
                  <td className={styles.td}>{subscription.classId?.trainerId?.lastName}</td>
                  <td className={styles.td}>
                    {subscription.memberId?.lastName}, {subscription.memberId?.firstName}
                  </td>
                  <td className={styles.td}>{subscription.date.slice(0, 10)}</td>
                  <td className={styles.tdBtn}>
                    <Button
                      variant={'deleteIcon'}
                      testid={'delete-btn'}
                      clickAction={() => {
                        selectId(dispatch, subscription._id);
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
}
export default Subscriptions;
