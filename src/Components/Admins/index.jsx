import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins } from '../../redux/admins/thunks';
import { Link } from 'react-router-dom';
import styles from './admins.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal/index';
import Loader from '../Shared/Loader';

function Admins() {
  const getData = useSelector((state) => state.admins.get.data);
  const getPending = useSelector((state) => state.admins.get.isPending);
  const getError = useSelector((state) => state.admins.get.error);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [messageReq, setMessageReq] = useState('');
  const [successModal, setSuccesModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const getDispatch = useDispatch();

  useEffect(() => {
    getAdmins(getDispatch);
    if (getError) {
      setErrorModal(getError);
      setErrorModal(!errorModal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDispatch]);

  const deleteAdmin = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
        method: 'DELETE'
      });

      const { error, message } = await res.json();
      setMessageReq(message);
      if (!error) {
        setSuccesModal(!successModal);
        setTimeout(() => {
          setSuccesModal(false);
        }, 2000);
      } else {
        setErrorModal(!errorModal);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    setTimeout(() => {
      deleteAdmin(id);
    }, 20);
  };
  if (getPending) {
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
        title={'Do you want to delete this Admin?'}
        onClose={() => setDeleteModal(!deleteModal)}
      >
        <Button
          variant={'delete'}
          text={'Delete'}
          clickAction={() => {
            handleDelete(deleteId);
            setDeleteModal(!deleteModal);
          }}
        />
        <Button
          variant={'white'}
          text={'Cancel'}
          clickAction={() => setDeleteModal(!deleteModal)}
        />
      </Modal>
      <Modal
        title={'Admin Deleted'}
        isOpen={successModal}
        text={messageReq}
        onClose={() => {
          setSuccesModal(!successModal);
        }}
      />
      <Modal
        isOpen={errorModal}
        title={'ERROR'}
        text={messageReq}
        warning
        onClose={() => {
          setErrorModal(!errorModal);
        }}
      >
        <Button variant={'delete'} text={'Close'} clickAction={() => setErrorModal(!errorModal)} />
      </Modal>
      <section className={styles.list}>
        <header className={styles.header}>
          <h1 className={styles.title}>Administrators</h1>
          <Link to="/admins/form">
            <Button text={'Add Admin'} variant={'add'} />
          </Link>
        </header>
        {getData.length > 0 ? (
          <table className={styles.table}>
            <tbody className={styles.tbody}>
              <tr className={styles.thead}>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>City</th>
                <th className={styles.th}>Email</th>
                <th className={styles.th}></th>
                <th className={styles.th}></th>
              </tr>
              {getData.map((admin) => {
                return (
                  <tr className={styles.tr} key={admin._id}>
                    <td className={styles.td}>{admin.firstName}</td>
                    <td className={styles.td}>{admin.city}</td>
                    <td className={styles.td}>{admin.email}</td>
                    <td className={styles.td}></td>
                    <td className={styles.icons}>
                      <Link to={`/admins/form/${admin._id}`}>
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
}

export default Admins;
