import React from 'react';
import { NavDropdown } from 'react-bootstrap';

import './navbar.css';

export default function NavEdit() {
  return (
    <div>
      <NavDropdown title='Edit' id='edit-dropdown'>
        <NavDropdown.Item href='#action/3.0'>
          Let's Get This Bread
        </NavDropdown.Item>

        <NavDropdown.Divider />

        <NavDropdown.Item href='#action/3.1'>
          Let's Get This Bread
        </NavDropdown.Item>

        <NavDropdown.Divider />

        <NavDropdown.Item href='#action/3.2'>
          Let's Get This Bread
        </NavDropdown.Item>

        <NavDropdown.Divider />

        <NavDropdown.Item href='#action/3.3'>
          Let's Get This Bread
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
}
