import { useEffect, useState } from 'react';
import styles from './members.module.css';

function Members() {
  const [members, setMembers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [birthDay, setBirthday] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [membership, setMembership] = useState('Classic');
  const [memberId, setMemberId] = useState('');

  const [firstNameAdd, setFirstNameAdd] = useState('');
  const [lastNameAdd, setLastNameAdd] = useState('');
  const [dniAdd, setDniAdd] = useState('');
  const [phoneAdd, setPhoneAdd] = useState('');
  const [emailAdd, setEmailAdd] = useState('');
  const [cityAdd, setCityAdd] = useState('');
  const [birthDayAdd, setBirthdayAdd] = useState('');
  const [postalCodeAdd, setPostalCodeAdd] = useState('');
  const [isActiveAdd, setIsActiveAdd] = useState(true);
  const [membershipAdd, setMembershipAdd] = useState('Classic');

  const handleLastName = (e) => {
    setLastNameAdd(e.target.value);
  };

  const handleDniChange = (e) => {
    const value = e.target.value;
    setDniAdd(value);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneAdd(value);
  };

  const handleEmailChange = (e) => {
    setEmailAdd(e.target.value);
  };

  const handleCityChange = (e) => {
    setCityAdd(e.target.value);
  };

  const handleBirthdayChange = (e) => {
    setBirthdayAdd(e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCodeAdd(e.target.value);
  };

  const handleMembershipChange = (e) => {
    setMembershipAdd(e.target.value);
  };

  const handleIsActiveChange = (e) => {
    setIsActiveAdd(e.target.value);
  };

  const changeHandler = (id) => {
    const member = members.find((member) => member._id === id);
    setFirstName(member?.firstName);
    setLastName(member?.lastName);
    setDni(member?.dni);
    setPhone(member?.phone);
    setEmail(member?.email);
    setCity(member?.city);
    setBirthday(member?.birthDay);
    setPostalCode(member?.postalCode);
    setIsActive(member?.isActive);
    setMembership(member?.membership);
    setMemberId(id);
  };

  const saveUpdate = (e) => {
    e.preventDefault();
    updatedMember(memberId);

    close();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMember({
      firstNameAdd,
      lastNameAdd,
      dniAdd,
      phoneAdd,
      emailAdd,
      cityAdd,
      birthDayAdd,
      postalCodeAdd,
      isActiveAdd,
      membershipAdd
    });
  };

  const addMember = async (member) => {
    console.log(member);
    try {
      const newMembers = await fetch(`${process.env.REACT_APP_API_URL}/api/members/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: member.firstNameAdd,
          lastName: member.lastNameAdd,
          dni: member.dniAdd,
          phone: member.phoneAdd,
          email: member.emailAdd,
          city: member.cityAdd,
          birthDay: member.birthDayAdd,
          postalCode: member.postalCodeAdd,
          isActive: member.isActiveAdd,
          membership: member.membershipAdd
        })
      });

      const { message, data, error } = await newMembers.json();
      alert(message);

      if (!error) {
        setMembers([...members, data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  const updatedMember = async (id) => {
    const adminIndex = members.findIndex((member) => member._id === id);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          dni: dni,
          phone: phone,
          email: email,
          city: city,
          birthDay: birthDay,
          postalCode: postalCode,
          isActive: isActive,
          membership: membership
        })
      });

      const { message, data, error } = await res.json();
      alert(message);

      if (!error) {
        const actualMembers = [...members];
        actualMembers[adminIndex] = data;
        setMembers(actualMembers);
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
    <section className={styles.container}>
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
                    <img
                      className={styles.update}
                      src="assets/images/Edit.svg"
                      onClick={() => changeHandler(member?._id)}
                    />
                  </td>
                  <td>
                    <img
                      className={styles.delete}
                      src="assets/images/Delete.svg"
                      onClick={() => deleteMember(member?._id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              placeholder="Name"
              name="firstName"
              onChange={(e) => setFirstNameAdd(e.target.value)}
            />
          </label>
          <label>
            Surname:
            <input type="text" placeholder="Surname" onChange={handleLastName} />
          </label>
          <label>
            DNI:
            <input type="text" placeholder="DNI" pattern="\d*" onChange={handleDniChange} />
          </label>
          <label>
            Phone:
            <input type="text" placeholder="Phone" pattern="\d*" onChange={handlePhoneChange} />
          </label>
          <label>
            email:
            <input type="text" placeholder="Email" onChange={handleEmailChange} />
          </label>
          <label>
            City:
            <input type="text" placeholder="City" onChange={handleCityChange} />
          </label>
          <label>
            Birthday:
            <input type="text" placeholder="Birthday" onChange={handleBirthdayChange} />
          </label>
          <label>
            Postal Code:
            <input type="text" placeholder="Postal Code" onChange={handlePostalCodeChange} />
          </label>
          <label>Its Active?</label>
          <select onChange={handleIsActiveChange}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <label>
            Membership:
            <select onChange={handleMembershipChange}>
              <option value="Classic">Classic</option>
              <option value="Only Classes">Only Classes</option>
              <option value="Black">Black Membership</option>
            </select>
          </label>
          <button type="submit" onSubmit={handleSubmit}>
            Enviar
          </button>
        </form>
      </div>
      <div>
        <form onSubmit={saveUpdate}>
          <label>
            Name:
            <input
              type="text"
              placeholder="Name"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label>
            Surname:
            <input type="text" placeholder="Surname" value={lastName} onChange={changeHandler} />
          </label>
          <label>
            DNI:
            <input
              type="text"
              placeholder="DNI"
              pattern="\d*"
              value={dni}
              onChange={changeHandler}
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              placeholder="Phone"
              pattern="\d*"
              value={phone}
              onChange={changeHandler}
            />
          </label>
          <label>
            email:
            <input type="text" placeholder="Email" value={email} onChange={changeHandler} />
          </label>
          <label>
            City:
            <input type="text" placeholder="City" value={city} onChange={changeHandler} />
          </label>
          <label>
            Birthday:
            <input type="text" placeholder="Birthday" value={birthDay} onChange={changeHandler} />
          </label>
          <label>
            Postal Code:
            <input
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              onChange={changeHandler}
            />
          </label>
          <label>Its Active?</label>
          <select value={isActive} onChange={changeHandler}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <label>
            Membership:
            <select value={membership} onChange={changeHandler}>
              <option value="Classic">Classic</option>
              <option value="Only Classes">Only Classes</option>
              <option value="Black">Black Membership</option>
            </select>
          </label>
          <button
            type="submit"
            onSubmit={() =>
              saveUpdate(
                firstName,
                lastName,
                dni,
                phone,
                email,
                city,
                birthDay,
                postalCode,
                isActive,
                membership,
                memberId
              )
            }
          >
            Editar
          </button>
        </form>
      </div>
    </section>
  );
}

export default Members;
