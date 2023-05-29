import React, { useState } from 'react';

const Form = ({ addTrainer }) => {
  const [trainer, setTrainer] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const onChangeInput = (e) => {
    setTrainer({
      ...trainer,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addTrainer(trainer);
    setTrainer({
      firstName: '',
      lastName: '',
      email: ''
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <div>
        <fieldset>
          <label>Name</label>
          <input name="firstName" type="text" onChange={onChangeInput} />
        </fieldset>
        <fieldset>
          <label>Last Name</label>
          <input name="lastName" type="text" onChange={onChangeInput} />
        </fieldset>
        <fieldset>
          <label>Email</label>
          <input name="email" type="text" onChange={onChangeInput} />
        </fieldset>
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
