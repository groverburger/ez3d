import React from 'react';
import { NavDropdown } from 'react-bootstrap';

import './navbar.css';

export default function NavFile() {
  return (
    <div className='navbar-items'>
      <NavDropdown title='File' id='file-dropdown'>
        <NavDropdown.Item href='#action/2.0'>
          Let's Get This Bread
        </NavDropdown.Item>

        <NavDropdown.Divider />

        <NavDropdown.Item href='#action/2.1'>
          Let's Get This Bread
        </NavDropdown.Item>

        <NavDropdown.Divider />

        <NavDropdown.Item href='#action/2.2'>
          Let's Get This Bread
        </NavDropdown.Item>

        <NavDropdown.Divider />

        <NavDropdown.Item href='#action/2.3'>
          Let's Get This Bread
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
}
