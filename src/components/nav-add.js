import { NavDropdown } from 'react-bootstrap';
import * as THREE from 'three';

import '../styles/navbar.css';

export default function NavAdd(props) {
  // adds a new model to the App's models list with the specified vertices
  const addModel = (vertices) => {
    const modelData = {
      position: [0, 0, 0],
      geometry: new THREE.BufferGeometry(),
      vertices: vertices,
      uuid: Math.random(),
    };
    modelData.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(vertices, 3)
    );
    modelData.geometry.computeVertexNormals();
    modelData.data = modelData;

    // this is a hack, we're currently not calling setState and instead forcing an update manually
    props.owner.state.models.push(modelData);
    props.owner.forceUpdate();
  };

  // When generating a new light, push an object containing the properties of the new light to the light list
  const addLight = (event) => {
    switch (event.target.innerHTML) {
      case 'Ambient Light':
        const newAmbient = { position: [0, 0, 0], type: 'ambient' };

        props.owner.state.lights.models.push(newAmbient);
        props.owner.forceUpdate();
        break;

      case 'Directional Light':
        const newDirectional = { position: [0, -2.5, 0], type: 'directional' };

        props.owner.state.lights.models.push(newDirectional);
        props.owner.forceUpdate();
        break;

      case 'Point Light':
        const newPoint = { position: [0, 0, 0], type: 'point' };

        props.owner.state.lights.models.push(newPoint);
        props.owner.forceUpdate();
        break;

      default:
        break;
    }
  };

  return (
    <div className='navbar-items'>
      <NavDropdown title='Add' id='add-dropdown'>
        <NavDropdown.Item
          href='#action/1.0'
          onClick={() => {
            addModel(
              new Float32Array([
                1, 1, 1, 1, -1, 1, 1, 1, -1, 1, -1, -1, 1, 1, -1, 1, -1, 1,

                1, 1, 1, 1, 1, -1, -1, 1, 1, -1, 1, -1, -1, 1, 1, 1, 1, -1,

                1, 1, 1, -1, 1, 1, 1, -1, 1, -1, -1, 1, 1, -1, 1, -1, 1, 1,

                -1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, -1, 1, -1, -1, -1,
                1,

                -1, -1, -1, 1, -1, -1, -1, -1, 1, 1, -1, 1, -1, -1, 1, 1, -1,
                -1,

                -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, -1, 1, -1, -1, -1, 1,
                -1,
              ])
            );
          }}
        >
          Cube
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.1'
          onClick={() => {
            addModel(
              new Float32Array([
                -1, -1, 1, 1, -1, 1, 1, 1, 1,

                1, 1, 1, -1, 1, 1, -1, -1, 1,
              ])
            );
          }}
        >
          Sphere
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={() => {
            addModel(
              new Float32Array([
                -1, -1, 1, 1, -1, 1, 1, 1, 1,

                1, 1, 1, -1, 1, 1, -1, -1, 1,
              ])
            );
          }}
        >
          Cylinder
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item
          href='#action/1.3'
          onClick={(event) => addLight(event)}
        >
          Ambient Light
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.4'
          onClick={(event) => addLight(event)}
        >
          Directional Light
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.5'
          onClick={(event) => addLight(event)}
        >
          Point Light
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
}
