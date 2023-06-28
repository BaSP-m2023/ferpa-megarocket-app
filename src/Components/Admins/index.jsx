import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins, deleteAdmin } from '../../redux/admins/thunks';
import { Link } from 'react-router-dom';
import styles from './admins.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal/index';
import Loader from '../Shared/Loader';
import * as actionsConstants from '../../redux/admins/actions';

const Admins = () => {
  const { isPending, data, error, errorSwitch, message } = useSelector((state) => state.admins);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [successModal, setSuccesModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionsConstants.deleteAdminsPending());
    getAdmins(dispatch);
    if (message && !errorSwitch) {
      setSuccesModal(true);
      setTimeout(() => {
        setSuccesModal(false);
      }, 2000);
      dispatch(actionsConstants.deleteAdminsPending());
    }
    return () => {
      dispatch(actionsConstants.deleteAdminsPending());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (errorSwitch) {
      setErrorModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorSwitch]);

  const handleDelete = (id) => {
    deleteAdmin(dispatch, id);
  };

  if (isPending) {
    return (
      <section className={styles.container}>
        <Loader />
      </section>
    );
  }
  return (
    <section className={styles.container}>
      <Modal
        isOpen={deleteModal}
        title={'Delete Admin'}
        text={'Are you sure you want to delete this Admin?'}
        onClose={() => setDeleteModal(!deleteModal)}
        testid={'confirm-modal'}
      >
        <Button
          variant={'delete'}
          text={'Delete'}
          clickAction={() => {
            handleDelete(deleteId);
            setDeleteModal(!deleteModal);
          }}
          testid={'delete-btn'}
        />
        <Button
          variant={'white'}
          text={'Cancel'}
          clickAction={() => setDeleteModal(!deleteModal)}
          testid={'cancel-btn'}
        />
      </Modal>
      <Modal
        title={'Admin has been succesfully deleted'}
        isOpen={successModal}
        success
        onClose={() => {
          setSuccesModal(!successModal);
        }}
        testid={'success-modal'}
      />
      <Modal
        isOpen={errorModal}
        title={'ERROR'}
        text={error}
        warning
        onClose={() => {
          setErrorModal(!errorModal);
        }}
        testid={'error-modal'}
      >
        <Button
          variant={'delete'}
          text={'Close'}
          clickAction={() => setErrorModal(!errorModal)}
          testid={'delete-btn'}
        />
      </Modal>
      <section className={styles.list}>
        <header className={styles.header}>
          <h1 className={styles.title}>Administrators</h1>
          <Link to="/superadmins/home/admins/add">
            <Button text={'Add'} variant={'add'} />
          </Link>
        </header>
        {data?.length > 0 ? (
          <table className={styles.table}>
            <tbody className={styles.tbody}>
              <tr className={styles.thead}>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>City</th>
                <th className={styles.th}>Email</th>
                <th className={styles.th}></th>
                <th className={styles.th}></th>
              </tr>
              {data?.map((admin) => {
                return (
                  <tr className={styles.tr} key={admin._id}>
                    <td className={styles.td}>{admin.firstName}</td>
                    <td className={styles.td}>{admin.city}</td>
                    <td className={styles.td}>{admin.email}</td>
                    <td className={styles.td}></td>
                    <td className={styles.icons}>
                      <Link to={`/superadmins/home/edit/${admin._id}`}>
                        <Button variant={'edit'} />
                      </Link>
                    </td>
                    <td className={styles.icons}>
                      <Button
                        variant={'deleteIcon'}
                        clickAction={() => {
                          setDeleteModal(!deleteModal);
                          setDeleteId(admin._id);
                        }}
                        testid={'delete-btn'}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <span className={styles.emptySpan}>No admins created yet</span>
        )}
      </section>
    </section>
  );
};

export default Admins;
