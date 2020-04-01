import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = props => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/all-shows">See All shows</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
