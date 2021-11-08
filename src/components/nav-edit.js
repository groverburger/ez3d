import React from 'react';
import { NavDropdown } from 'react-bootstrap';

import '../styles/navbar.css';

export default function NavEdit() {
  return (
    <div className='navbar-items'>
      <NavDropdown title='Edit' id='edit-dropdown'>
        <NavDropdown.Item
          href='#action/3.0'
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ margin: '0' }}>Undo</div>
          <div style={{ margin: '0', color: '#4f4f4f4f' }}>Ctrl + Z</div>
        </NavDropdown.Item>

        <NavDropdown.Item
          href='#action/3.1'
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ margin: '0' }}>Redo</div>
          <div style={{ margin: '0', color: '#4f4f4f4f' }}>Ctrl + Y</div>
        </NavDropdown.Item>

        <NavDropdown.Item
          href='#action/3.2'
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ margin: '0' }}>Duplicate</div>
          <div style={{ margin: '0', color: '#4f4f4f4f' }}>Ctrl + D</div>
        </NavDropdown.Item>

        <NavDropdown.Item
          href='#action/3.3'
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ margin: '0' }}>Delete</div>
          <div style={{ margin: '0', color: '#4f4f4f4f' }}>Del</div>
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
}
