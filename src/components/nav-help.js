import { NavDropdown } from 'react-bootstrap';
import '../styles/navbar.css';

export function NavHelp() {
  return (
    <div className='navbar-items'>
      <NavDropdown title='Help' id='Help-dropdown'>
        <NavDropdown.Item
          href='#action/3.0'
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ margin: '0' }}>About mesh</div>
        </NavDropdown.Item>

        <NavDropdown.Item
          href='#action/3.1'
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ margin: '0' }}>About Light</div>
        </NavDropdown.Item>

        <NavDropdown.Item
          href='#action/3.2'
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ margin: '0' }}>Contact us</div>
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
}
