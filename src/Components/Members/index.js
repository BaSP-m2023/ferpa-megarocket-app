import { useEffect, useState } from 'react';
import styles from './members.module.css';

function Members() {
  const [members, setMembers] = useState([]);
  const [firstName, setName] = useState('');
  const [lastName, setSurname] = useState('');
  const [dni, setDni] = useState();
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [birthDay, setBirthday] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [membership, setMembership] = useState('Classic');

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleDniChange = (e) => {
    const value = e.target.value;
    setDni(value);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleMembershipChange = (e) => {
    console.log(e.target.value);
    setMembership(e.target.value);
  };

  const handleIsActiveChange = (e) => {
    setIsActive(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMember({
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      birthDay,
      postalCode,
      isActive,
      membership
    });
  };

  const addMember = async (member) => {
    try {
      console.log(member);
      const newMembers = await fetch(`${process.env.REACT_APP_API}/api/members/`, {
        method: 'POST',
        body: JSON.stringify(member),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const { message, data, error } = await newMembers.json();
      alert(message);

      if (!error) {
        setMembers([...members, data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMember = async (id) => {
    try {
      const confirmDelete = window.confirm('You want to delete?');
      if (confirmDelete) {
        const apiResponse = await fetch(`${process.env.REACT_APP_API}/api/members/${id}`, {
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

  // const updateMember = async (id) => {
  //   try {
  //     const
  //   } catch (error) {

  //   }
  // }

  const getMembers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/members`);
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
    <section className={styles.container}>
      <h2>Members</h2>
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
              <tr key={member._id}>
                <td>{member.firstName}</td>
                <td>{member.lastName}</td>
                <td>{member.dni}</td>
                <td>{member.email}</td>
                <td>{member.phone}</td>
                <td></td>
                <td>
                  <img src="assets/images/Edit.svg" />
                </td>
                <td>
                  <img
                    className={styles.delete}
                    src="assets/images/Delete.svg"
                    onClick={() => deleteMember(member._id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            placeholder="Name"
            name="firstName"
            value={firstName}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Surname:
          <input
            type="text"
            placeholder="Surname"
            value={lastName}
            onChange={handleSurnameChange}
          />
        </label>
        <label>
          DNI:
          <input
            type="text"
            placeholder="DNI"
            pattern="\d*"
            value={dni}
            onChange={handleDniChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            placeholder="Phone"
            pattern="\d*"
            value={phone}
            onChange={handlePhoneChange}
          />
        </label>
        <label>
          email:
          <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          City:
          <input type="text" placeholder="City" value={city} onChange={handleCityChange} />
        </label>
        <label>
          Birthday:
          <input
            type="date"
            placeholder="Birthday"
            value={birthDay}
            onChange={handleBirthdayChange}
          />
        </label>
        <label>
          Postal Code:
          <input
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={handlePostalCodeChange}
          />
        </label>
        <label>Its Active?</label>
        <select value={isActive} onChange={handleIsActiveChange}>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <label>
          Membership:
          <select value={membership} onChange={handleMembershipChange}>
            <option value="Classic">Classic</option>
            <option value="Only Classes">Only Classes</option>
            <option value="Black">Black Membership</option>
          </select>
        </label>
        <button type="submit" onSubmit={handleSubmit}>
          Enviar
        </button>
      </form>
    </section>
  );
}

export default Members;
