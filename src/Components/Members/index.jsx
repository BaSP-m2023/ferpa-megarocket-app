import { useEffect, useState } from 'react';
import styles from './members.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMembers } from '../../redux/members/thunks';
import Button from '../Shared/Button/';
import Modal from '../Shared/Modal/';
import Loader from '../Shared/Loader';

function Members() {
  const [showModal, setShowModal] = useState(false);
  const [memberId, setMemberId] = useState('');
  const { data, isPending, error } = useSelector((state) => state.members);
  const [members, setMembers] = useState([]);
  const dispatch = useDispatch();

  const deleteMember = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`, {
        method: 'DELETE'
      });
      setMembers([...members.filter((member) => member._id !== id)]);
    } catch (error) {
      console.error(error);
    }
  };

  // const getMembers = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`);
  //     const data = await response.json();
  //     setMembers(data.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    getMembers(dispatch);
  }, [dispatch]);

  if (isPending) {
    return (
      <div className={styles.container + ' ' + styles.whiteLetters}>
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
    <section className={styles.container + ' ' + styles.whiteLetters}>
      <div className={styles.header}>
        <h2>Members</h2>
        <Link to={'/members/create'}>
          <Button text={'Create new member'} variant={'add'} />
        </Link>
      </div>
      {error !== '' ? (
        <div>
          <p className={styles.whiteLetters}>{error}</p>
        </div>
      ) : (
        <table className={styles.list}>
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
                  <Modal
                    onClose={() => setShowModal(false)}
                    isOpen={showModal}
                    title={`Are you sure you want to delete this member?`}
                    warning={true}
                  >
                    <Button
                      text={'Delete'}
                      variant={'delete'}
                      clickAction={() => {
                        deleteMember(memberId);
                        setShowModal(false);
                      }}
                    />
                    <Button
                      text={'Cancel'}
                      variant={'white'}
                      clickAction={() => setShowModal(false)}
                    />
                  </Modal>
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
        </table>
      )}
    </section>
  );
}

export default Members;
