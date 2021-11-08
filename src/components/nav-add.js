import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import * as THREE from 'three';

import './navbar.css';

export default function NavAdd(props) {
  // adds a new model to the App's models list with the specified vertices
  const addModel = vertices => {
    const modelData = {
      position: [0,0,0],
      geometry: new THREE.BufferGeometry(),
      material: new THREE.MeshBasicMaterial({ color: 0x4488ff }),
      vertices: vertices,
      uuid: Math.random(),
    }
    modelData.geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    modelData.data = modelData

    // this is a hack, we're currently not calling setState and instead forcing an update manually
    props.owner.state.models.push(modelData)
    props.owner.forceUpdate()
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
