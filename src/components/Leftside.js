import React from 'react';
import {Link} from 'react-router-dom';

function Leftside() {
  return (
    <div className="left-nav-wrapper">
      <ul>
        <li><Link to="/">Restaurant</Link></li>
        <li><Link to="/hotel">Hotel</Link></li>
        <li><Link to="/gym">Gym</Link></li>
      </ul>
    </div>
  )
}

export default Leftside;
