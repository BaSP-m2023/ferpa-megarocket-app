import { useEffect, useState } from 'react';
import styles from './members.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMembers, deleteMember } from 'redux/members/thunks';
import Button from 'Components/Shared/Button/';
import Modal from 'Components/Shared/Modal/';
import Loader from 'Components/Shared/Loader';

function Members() {
  const [showModal, setShowModal] = useState(false);
  const [showModalDeleteSuccess, setShowModalDeleteSuccess] = useState(false);
  const [memberId, setMemberId] = useState('');
  const { data, isPending, message, error, success } = useSelector((state) => state.members);
  const [theMessage, setTheMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (success) {
      setTheMessage(message);
      setShowModalDeleteSuccess(true);
      setTimeout(() => {
        setShowModalDeleteSuccess(false);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const delMember = (id) => {
    dispatch(deleteMember(id));
  };

  if (isPending) {
    return (
      <div className={`${styles.container} ${styles.whiteLetters}`}>
        <div className={styles.list}>
          <div className={styles.header}>
            <h2>Members</h2>
            <Link to={'admin/members/form'}>
              <Button text={'Create new member'} variant={'add'} />
            </Link>
          </div>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <section className={styles.list}>
        <Modal
          onClose={() => setShowModalDeleteSuccess(false)}
          isOpen={showModalDeleteSuccess}
          title={theMessage}
          success
        ></Modal>
        <div className={styles.header}>
          <h2 className={styles.title}>Members</h2>
          <Link to={'/admin/members/form'}>
            <Button text={'Add'} variant={'add'} />
          </Link>
        </div>
        {error ? (
          <div>
            <p className={styles.whiteLetters}>{message}</p>
          </div>
        ) : (
          <table className={styles.table}>
            <tbody>
              <tr className={styles.trHead}>
                <th className={styles.thead}>Name</th>
                <th className={styles.thead}>Surname</th>
                <th className={styles.thead}>DNI</th>
                <th className={styles.thead}>Email</th>
                <th className={styles.thead}>Phone</th>
                <th className={styles.tdBtn}></th>
                <th className={styles.tdBtn}></th>
              </tr>
              {data.map((item) => {
                return (
                  <tr key={item._id} className={styles.tr}>
                    <td className={styles.td}>{item.firstName}</td>
                    <td className={styles.td}>{item.lastName}</td>
                    <td className={styles.td}>{item.dni}</td>
                    <td className={styles.td}>{item.email}</td>
                    <td className={styles.td}>{item.phone}</td>
                    <td className={styles.tdBtn}>
                      <Link to={`admin/members/form/${item._id}`}>
                        <Button variant={'edit'} />
                      </Link>
                    </td>
                    <td className={styles.tdBtn}>
                      <Button
                        variant={'deleteIcon'}
                        clickAction={() => {
                          setShowModal(true);
                          setMemberId(item._id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <Modal
              onClose={() => setShowModal(false)}
              isOpen={showModal}
              title={`Confirm Delete`}
              text={'Are you sure that you want to delete this member?'}
              warning={true}
            >
              <Button
                text={'Delete'}
                variant={'delete'}
                clickAction={() => {
                  delMember(memberId);
                  setShowModal(false);
                }}
              />
              <Button text={'Cancel'} variant={'white'} clickAction={() => setShowModal(false)} />
            </Modal>
          </table>
        )}
      </section>
    </section>
  );
}

export default Members;
