import React from 'react';
import { Link } from 'react-router-dom';

const Aside = () => {
  return (
    <aside>
      <div>
        <Link to="/home/landing">
          <h3>Home</h3>
        </Link>
        <Link to="/home/login">
          <h3>Login</h3>
        </Link>
        <Link to="/home/signup">
          <h3>Signup</h3>
        </Link>
      </div>
    </aside>
  );
};

export default Aside;
