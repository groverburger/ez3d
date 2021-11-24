import { NavDropdown } from 'react-bootstrap';
import { useModel, useLight } from './context';
import '../styles/navbar.css';
import * as THREE from 'three';

export default function NavAdd() {
  const { setModelData } = useModel();
  const { setLightData } = useLight();

  return (
    <div className='navbar-items'>
      <NavDropdown title='Add' id='add-dropdown'>
        <NavDropdown.Item
          href='#action/1.0'
          onClick={(event) => generateNewShape("BoxGeometry", 'cornFlowerBlue')}
        >
          Cube
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.1'
          onClick={(event) => generateNewShape("SphereGeometry", 'purple')}
        >
          Sphere
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={(event) => generateNewShape("CylinderGeometry", 'yellow')}
        >
          Cylinder
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={(event) => generateNewShape("ConeGeometry", 'crimson')}
        >
          Cone
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={(event) => generateNewShape("TorusGeometry", 'orange')}
        >
          Torus
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={(event) => generateNewShape("TetrahedronGeometry", 'seagreen')}
        >
          Tetrahedron
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={(event) => generateNewShape("IcosahedronGeometry", 'hotpink')}
        >
          Icosahedron
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={(event) => generateNewShape("OctahedronGeometry", 'tomato')}
        >
          Octahedron
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={(event) => generateNewShape("DodecahedronGeometry", 'slateblue')}
        >
          Dodecahedron
        </NavDropdown.Item>
        <NavDropdown.Divider className='nav-divider' />
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

  function generateNewShape(geometryType, color) {
    setModelData({
      uuid: Math.random(),
      color: color,
      geometryType: geometryType,
      //position: {x: 2, y: 3, z: 4},
      //rotation: {x: 0, y: 0, z: Math.PI/8},
      //scale: {x: 2, y: 1, z: 3},
    });
  }

  // When generating a new light, push an object containing the properties of the new light to the light list
  function generateNewLight(event) {
    switch (event.target.innerHTML) {
      case 'Ambient Light':
        const newAmbient = {
          position: { position: [0, 0, 0] },
          type: 'ambient',
          uuid: Math.random(),
        };
        setLightData(newAmbient);
        break;

      case 'Directional Light':
        const newDirectional = {
          position: { position: [0, -2.5, 0] },
          type: 'directional',
          uuid: Math.random(),
        };
        setLightData(newDirectional);
        break;

      case 'Point Light':
        const newPoint = {
          position: { position: [0, 6.5, 0] },
          type: 'point',
          uuid: Math.random(),
        };
        setLightData(newPoint);
        break;

      default:
        break;
    }
  }
}
