import React, { useContext } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { ShapeContext } from './context';

import './navbar.css';

/**
 * Contains the functionality for the Add dropdown. We use the saved state value of the generated
 * shapes and add onto that when generating a new shape. The saved state value is an object of
 * arrays that holds all the positions for any generated shape. Each array corresponds to their
 * respective shape. For more information, look at shapes and setShapes in App.js and ShapeContext
 * in context.js.
 *
 * Reference: https://stackoverflow.com/questions/66727049/exporting-a-state-from-hook-function-to-another-component
 *            https://tyrannosaurustech.com/blog/global-state-management-with-react-hooks-and-context/
 *            https://stackoverflow.com/questions/58451029/usestate-object-set
 *            https://stackoverflow.com/questions/60305746/how-do-i-update-an-object-state-in-react-via-hooks
 */
export default function NavAdd() {
  const value = useContext(ShapeContext);
  const [shapes, setShapes] = value;

  return (
    <div className='navbar-items'>
      <NavDropdown title='Add' id='add-dropdown'>
        <NavDropdown.ItemText>Meshes</NavDropdown.ItemText>
        <NavDropdown.Divider />
        <NavDropdown.Item href='#action/1.0' onClick={() => generateNewBlock()}>
          Cube
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.1'
          onClick={() => generateNewSphere()}
        >
          Sphere
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={() => generateNewCylinder()}
        >
          Cylinder
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.ItemText>Lights</NavDropdown.ItemText>
        <NavDropdown.Divider />
        <NavDropdown.Item href='#action/1.3'>Point</NavDropdown.Item>
        <NavDropdown.Item href='#action/1.4'>Direction</NavDropdown.Item>
        <NavDropdown.Item href='#action/1.5'>Ambient</NavDropdown.Item>
      </NavDropdown>
    </div>
  );

  /**
   * Edited by Ruiyang
   * Function for generating a new block.
   *
   * Edited by Antonio
   * Instead of pushing the position into an array for each shape,
   * we instead push an array into an object that holds arrays. Now
   * we only have to call on the object to access the arrays rather
   * than call the array three different times for each shape.
   */
  function generateNewBlock() {
    const total = shapes.boxes.length;
    let newBoxes = shapes.boxes;
    newBoxes.push({ position: [0, 0, 0] });
    console.log(total);
    setShapes((prevShapes) => ({ ...prevShapes, boxes: newBoxes }));
  }

  /**
   * Generate New Cylinder
   */
  function generateNewCylinder() {
    const total = shapes.cylinders.length;
    let newCylinders = shapes.cylinders;
    newCylinders.push({ position: [0, 0, 0] });
    console.log(total);
    setShapes((prevShapes) => ({ ...prevShapes, cylinders: newCylinders }));
  }

  /**
   * Generate New Sphere
   */
  function generateNewSphere() {
    const total = shapes.spheres.length;
    let newSpheres = shapes.spheres;
    newSpheres.push({ position: [0, 0, 0] });
    console.log(total);
    setShapes((prevShapes) => ({ ...prevShapes, spheres: newSpheres }));
  }
}
