import React from 'react';
import { NavDropdown } from 'react-bootstrap';

import '../styles/navbar.css';

export default function NavFile() {
  return (
    <div className='navbar-items'>
      <NavDropdown title='File' id='file-dropdown'>
        <NavDropdown.Item href='#action/2.0'>New</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href='#action/2.1'>Import</NavDropdown.Item>
        <NavDropdown.Item href='#action/2.2'>Export</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href='#action/2.3'>Settings</NavDropdown.Item>
      </NavDropdown>
    </div>
  );
}
