import { NavDropdown } from 'react-bootstrap';
import '../styles/navbar.css';

/**
 * Show the drop-down list that contains all object operations
 * Undo operation/Redo operation/Delete mesh based on the selection
 *
 * @returns {object} JSX containing object operation
 */

export function NavEdit() {
  //Programmatically triggers the hotkeys for Undo, Redo, Delete
  const handleRedo = (event) => {
    document.dispatchEvent(new KeyboardEvent("keydown", {'key': 'y','ctrlKey': 'true'}));
  };
  const handleUndo = (event) => {
    document.dispatchEvent(new KeyboardEvent("keydown", {'key': 'z','ctrlKey': 'true'}));
  };
  const handleDelete = (event) => {
    document.dispatchEvent(new KeyboardEvent("keydown", {'key': 'x','ctrlKey': 'true'}));
  };

  return (
    <div className='navbar-items'>
      <NavDropdown title='Edit' id='edit-dropdown'>
        <NavDropdown.Item
          href='#action/3.0'
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
          onClick={() => handleUndo()}
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
          onClick={() => handleRedo()}
        >
          <div style={{ margin: '0' }}>Redo</div>
          <div style={{ margin: '0', color: '#4f4f4f4f' }}>Ctrl + Y</div>
        </NavDropdown.Item>


        <NavDropdown.Item
          href='#action/3.3'
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
          onClick={() => handleDelete()}
        >
          <div style={{ margin: '0' }}>Delete</div>
          <div style={{ margin: '0', color: '#4f4f4f4f' }}>Ctrl + X</div>
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
}
