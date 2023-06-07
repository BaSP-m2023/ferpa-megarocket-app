import { useEffect, useState } from 'react';
import styles from './members.module.css';
import { Link } from 'react-router-dom';
import Button from '../Shared/Button/';

function Members() {
  const [members, setMembers] = useState([]);

  const deleteMember = async (id) => {
    try {
      const confirmDelete = window.confirm('You want to delete?');
      if (confirmDelete) {
        const apiResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`, {
          method: 'DELETE'
        });
        const data = await apiResponse.json();
        alert(data.message);
        setMembers([...members.filter((members) => members._id !== id)]);
      }
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
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>DNI</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
            {members.map((member) => {
              return (
                <tr key={member?._id}>
                  <td>{member?.firstName}</td>
                  <td>{member?.lastName}</td>
                  <td>{member?.dni}</td>
                  <td>{member?.email}</td>
                  <td>{member?.phone}</td>
                  <td></td>
                  <td>
                    <Link to={`members/edit/${member?._id}`}>
                      <Button type={'edit'} />
                    </Link>
                  </td>
                  <td>
                    <Button type={'deleteIcon'} clickAction={() => deleteMember(member?._id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <Link to={'/members/create'}>
          <Button text={'Create new member'} type={'add'} />
        </Link>
      </div>
    </section>
  );
}

export default Members;
