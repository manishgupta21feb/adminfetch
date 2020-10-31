import React from 'react';
import logoblack from '../assets/images/logo-black.png';
import Dropdown from 'react-bootstrap/Dropdown'

function Header() {
  return (
    <header>
      <div className="logo-wrapper">
        <img src={logoblack} alt="logo"/>
      </div>
      <Dropdown className="custom-dropdown">
        <Dropdown.Toggle variant="success">
          Manish gupta
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#">Change Password</Dropdown.Item>
          <Dropdown.Item href="#">Sign Out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </header>
  )
}

export default Header;
