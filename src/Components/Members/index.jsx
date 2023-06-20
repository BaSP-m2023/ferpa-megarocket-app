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
  }, [dispatch]);

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
            <Link to={'/members/create'}>
              <Button text={'Create new member'} variant={'add'} />
            </Link>
          </div>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <section className={`${styles.container} ${styles.whiteLetters}`}>
      <div className={styles.purpleBack}>
        <div className={styles.header}>
          <h2>Members</h2>
          <Link to={'/members/create'}>
            <Button text={'Create new member'} variant={'add'} />
          </Link>
        </div>
        {error ? (
          <div>
            <p className={styles.whiteLetters}>{message}</p>
          </div>
        ) : (
          <table className={styles.list}>
            <Modal
              onClose={() => setShowModalDeleteSuccess(false)}
              isOpen={showModalDeleteSuccess}
              title={theMessage}
              success
            ></Modal>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>DNI</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
              {data.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.dni}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td></td>
                    <td>
                      <Link to={`members/edit/${item._id}`}>
                        <Button variant={'edit'} />
                      </Link>
                    </td>

                    <td>
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
      </div>
    </section>
  );
}

export default Members;
