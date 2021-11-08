import React, { useContext } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { ShapeContext, LightContext } from './context';

import '../styles/navbar.css';

/**
 * Contains the functionality for the Add dropdown. We use the saved state value of the generated shapes and add
 * onto that when generating a new shape. The saved state value is an object of arrays that holds all the positions
 * for any generated shape. Each array corresponds to their respective shape. For more information, look at shapes
 * and setShapes in App.js and ShapeContext in context.js.
 *
 * Reference: https://stackoverflow.com/questions/66727049/exporting-a-state-from-hook-function-to-another-component
 *            https://tyrannosaurustech.com/blog/global-state-management-with-react-hooks-and-context/
 *            https://stackoverflow.com/questions/58451029/usestate-object-set
 *            https://stackoverflow.com/questions/60305746/how-do-i-update-an-object-state-in-react-via-hooks
 */
export default function NavAdd() {
  const value = useContext(ShapeContext);
  const [shapes, setShapes] = value;

  const lightValue = useContext(LightContext);
  const setLights = lightValue;

  return (
    <div className='navbar-items'>
      <NavDropdown title='Add' id='add-dropdown'>
        <NavDropdown.Item
          href='#action/1.0'
          onClick={(event) => generateNewShape(event)}
        >
          Cube
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.1'
          onClick={(event) => generateNewShape(event)}
        >
          Sphere
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={(event) => generateNewShape(event)}
        >
          Cylinder
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item
          href='#action/1.3'
          onClick={(event) => generateNewLight(event)}
        >
          Ambient Light
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.4'
          onClick={(event) => generateNewLight(event)}
        >
          Directional Light
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.5'
          onClick={(event) => generateNewLight(event)}
        >
          Point Light
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );

  /**
   * Edited by Ruiyang
   * Function for generating a new shapes.
   *
   * Edited by Antonio
   * Instead of pushing the position into an array for each shape, we instead push an array into an object that holds
   * arrays. Now we only have to call on the object to access the arrays rather than call the array three different
   * times for each shape.
   */
  function generateNewShape(event) {
    switch (event.target.innerHTML) {
      case 'Cube':
        const totalCubes = shapes.boxes.length;
        let newBoxes = shapes.boxes;
        newBoxes.push({ position: [0, 0, 0] });
        console.log(totalCubes);
        setShapes((prevShapes) => ({ ...prevShapes, boxes: newBoxes }));
        break;

      case 'Cylinder':
        const totalCylinders = shapes.cylinders.length;
        let newCylinders = shapes.cylinders;
        newCylinders.push({ position: [0, 0, 0] });
        console.log(totalCylinders);
        setShapes((prevShapes) => ({ ...prevShapes, cylinders: newCylinders }));
        break;

      case 'Sphere':
        const totalSpheres = shapes.spheres.length;
        let newSpheres = shapes.spheres;
        newSpheres.push({ position: [0, 0, 0] });
        console.log(totalSpheres);
        setShapes((prevShapes) => ({ ...prevShapes, spheres: newSpheres }));
        break;

      default:
        break;
    }
  }

  function generateNewLight(event) {
    switch (event.target.innerHTML) {
      case 'Ambient Light':
        const newAmbient = { position: [0, 0, 0] };

        setLights((prevLights) => {
          prevLights.ambient.push(newAmbient);
          return { ...prevLights, ambient: prevLights.ambient };
        });
        break;

      case 'Directional Light':
        const newDirectional = { position: [0, -2.5, 0] };

        setLights((prevLights) => {
          prevLights.directional.push(newDirectional);
          return { ...prevLights, directional: prevLights.directional };
        });
        break;

      case 'Point Light':
        const newPoint = { position: [0, 0, 0] };

        setLights((prevLights) => {
          prevLights.point.push(newPoint);
          return { ...prevLights, point: prevLights.point };
        });
        break;

      default:
        break;
    }
  }
}
