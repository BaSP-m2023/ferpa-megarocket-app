import { useState, useEffect } from 'react';
import styles from './admins.module.css';
import Button from '../Shared/Button';
import { Link } from 'react-router-dom';
import Modal from '../Shared/Modal/index';

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [messageReq, setMessageReq] = useState('');
  const [successModal, setSuccesModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    const getAdmins = async () => {
      const svAdmins = await getAllAdmins();
      setAdmins(svAdmins);
    };

    getAdmins();
  }, []);

  const getAllAdmins = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
      const { data } = await res.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAdmin = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
        method: 'DELETE'
      });

      const { error, message } = await res.json();
      if (!error) {
        setMessageReq(message);
        setSuccesModal(!successModal);
      } else {
        setMessageReq(message);
        setErrorModal(!errorModal);
      }
      setAdmins(admins.filter((admin) => admin._id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = (id) => {
    setTimeout(() => {
      deleteAdmin(id);
    }, 20);
  };
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
        isOpen={successModal}
        text={messageReq}
        onClose={() => {
          setSuccesModal(!successModal);
        }}
      >
        <Button variant={'add'} text={'OK'} clickAction={() => setSuccesModal(!successModal)} />
      </Modal>
      <Modal
        isOpen={errorModal}
        title={'ERROR'}
        text={messageReq}
        warning
        onClose={() => {
          setErrorModal(!errorModal);
        }}
      >
        <Button variant={'add'} text={'OK'} clickAction={() => setErrorModal(!errorModal)} />
      </Modal>
      <section className={styles.list}>
        <header className={styles.header}>
          <h1 className={styles.title}>Administrators</h1>
          <Link to="/admins/form">
            <Button text={'Add Admin'} variant={'add'} />
          </Link>
        </header>
        {admins.length > 0 ? (
          <table className={styles.table}>
            <tbody className={styles.tbody}>
              <tr className={styles.thead}>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>City</th>
                <th className={styles.th}>Email</th>
                <th className={styles.th}></th>
                <th className={styles.th}></th>
              </tr>
              {admins.map((admin) => {
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
