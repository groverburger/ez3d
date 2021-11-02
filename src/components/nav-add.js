import React, { useContext } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { ShapeContext } from './context';
import * as THREE from 'three';

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
  const [shapes, setShapes] = useContext(ShapeContext);

  // adds a new model to the scene with the specified vertices
  const addModel = (vertices) => {
    const modelData = {
      position: [0,0,0],
      geometry: new THREE.BufferGeometry(),
      material: new THREE.MeshBasicMaterial({ color: 0x4488ff }),
      vertices: vertices,
    }
    modelData.geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    modelData.data = modelData

    setShapes((shapes) => {
      shapes.models.push(modelData)
      return {models: shapes.models}
    })
  }

  return (
    <div className='navbar-items'>
      <NavDropdown title='Add' id='add-dropdown'>
        <NavDropdown.ItemText>Meshes</NavDropdown.ItemText>
        <NavDropdown.Divider />
        <NavDropdown.Item
          href='#action/1.0'
          onClick={() => {
            addModel(new Float32Array([
               1,  1,  1,
               1, -1,  1,
               1,  1, -1,
               1, -1, -1,
               1,  1, -1,
               1, -1,  1,

               1,  1,  1,
               1,  1, -1,
              -1,  1,  1,
              -1,  1, -1,
              -1,  1,  1,
               1,  1, -1,

               1,  1,  1,
              -1,  1,  1,
               1, -1,  1,
              -1, -1,  1,
               1, -1,  1,
              -1,  1,  1,

              -1, -1, -1,
              -1, -1,  1,
              -1,  1, -1,
              -1,  1,  1,
              -1,  1, -1,
              -1, -1,  1,

              -1, -1, -1,
               1, -1, -1,
              -1, -1,  1,
               1, -1,  1,
              -1, -1,  1,
               1, -1, -1,

              -1, -1, -1,
              -1,  1, -1,
               1, -1, -1,
               1,  1, -1,
               1, -1, -1,
              -1,  1, -1,
            ]))
          }}
        >
          Cube
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.1'
          onClick={() => {
            addModel(new Float32Array([
              -1, -1,  1,
               1, -1,  1,
               1,  1,  1,

               1,  1,  1,
              -1,  1,  1,
              -1, -1,  1,
            ]))
          }}
        >
          Sphere
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={() => {
            addModel(new Float32Array([
              -1, -1,  1,
               1, -1,  1,
               1,  1,  1,

               1,  1,  1,
              -1,  1,  1,
              -1, -1,  1,
            ]))
          }}
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
}
