import { useEffect, useState } from 'react';
import styles from './members.module.css';
import { Link } from 'react-router-dom';
import Button from '../Shared/Button/';
import Modal from '../Shared/Modal/';

function Members() {
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [memberId, setMemberId] = useState('');

  const deleteMember = async (id) => {
    try {
      const apiResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`, {
        method: 'DELETE'
      });
      const data = await apiResponse.json();
      alert(data.message);
      setMembers([...members.filter((members) => members._id !== id)]);
    } catch (error) {
      console.error(error);
    }
  };

  const getMembers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`);
      const data = await response.json();
      setMembers(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <section className={styles.container + ' ' + styles.whiteLetters}>
      <h2>Members</h2>
      <div>
        <table className={styles.list}>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>DNI</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
            {members.map((item) => {
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
      </div>
      <div>
        <Link to={'/members/create'}>
          <Button text={'Create new member'} variant={'add'} />
        </Link>
      </div>
    </section>
  );
}

export default Members;
