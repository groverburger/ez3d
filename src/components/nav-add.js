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
          onClick={() => {
            addModel(
              new Float32Array([
                1, 1, 1, 1, -1, 1, 1, 1, -1, 1, -1, -1, 1, 1, -1, 1, -1, 1, 1,
                1, 1, 1, 1, -1, -1, 1, 1, -1, 1, -1, -1, 1, 1, 1, 1, -1, 1, 1,
                1, -1, 1, 1, 1, -1, 1, -1, -1, 1, 1, -1, 1, -1, 1, 1, -1, -1,
                -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, -1, 1, -1, -1, -1, 1, -1,
                -1, -1, 1, -1, -1, -1, -1, 1, 1, -1, 1, -1, -1, 1, 1, -1, -1,
                -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, -1, 1, -1, -1, -1, 1,
                -1,
              ]),
              '#4488ff'
            );
          }}
        >
          Cube
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.1'
          onClick={() => generateSphere(16, 12)}
        >
          Sphere
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={() => generateCylinder(16)}
        >
          Cylinder
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={(event) => generateComplexShape(event, 'crimson')}
        >
          Cone
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={(event) => generateComplexShape(event, 'orange')}
        >
          Torus
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={(event) => generateComplexShape(event, 'seagreen')}
        >
          Tetrahedron
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={(event) => generateComplexShape(event, 'hotpink')}
        >
          Icosahedron
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={(event) => generateComplexShape(event, 'tomato')}
        >
          Octahedron
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={(event) => generateComplexShape(event, 'slateblue')}
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

  function addModel(vertices, color) {
    const newModel = {
      attributes: {
        position: [0, 0, 0],
        geometry: new THREE.BufferGeometry(),
        uuid: Math.random(),
        color: color,
        vertices: vertices,
      },
      type: 'simple',
    };

    newModel.attributes.geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    newModel.attributes.geometry.computeVertexNormals();

    setModelData(newModel);
  }

  function generateSphere(hsegs, vsegs) {}

  function generateCylinder(segs) {
    const verts = [];
    const step = (Math.PI * 2) / segs;

    for (let i = 0; i < Math.PI * 2; i += step) {
      // generate the sides
      verts.push(Math.cos(i));
      verts.push(-1);
      verts.push(Math.sin(i));
      verts.push(Math.cos(i));
      verts.push(1);
      verts.push(Math.sin(i));
      verts.push(Math.cos(i + step));
      verts.push(-1);
      verts.push(Math.sin(i + step));

      verts.push(Math.cos(i + step));
      verts.push(-1);
      verts.push(Math.sin(i + step));
      verts.push(Math.cos(i));
      verts.push(1);
      verts.push(Math.sin(i));
      verts.push(Math.cos(i + step));
      verts.push(1);
      verts.push(Math.sin(i + step));

      // generate top
      verts.push(Math.cos(i));
      verts.push(1);
      verts.push(Math.sin(i));
      verts.push(0);
      verts.push(1);
      verts.push(0);
      verts.push(Math.cos(i + step));
      verts.push(1);
      verts.push(Math.sin(i + step));

      // generate bottom
      verts.push(Math.cos(i));
      verts.push(-1);
      verts.push(Math.sin(i));
      verts.push(Math.cos(i + step));
      verts.push(-1);
      verts.push(Math.sin(i + step));
      verts.push(0);
      verts.push(-1);
      verts.push(0);
    }

    addModel(new Float32Array(verts), 'limegreen');
  }

  function generateComplexShape(event, color) {
    const newModel = {
      attributes: 
        { position: [0, 0, 0],
          uuid: Math.random(),
          color: color,
        },
      type: 'complex',
    }

    switch (event.target.innerHTML) {
      case 'Cone':
        newModel['geometry'] = <coneBufferGeometry attach='geometry' />
        break;

      case 'Torus':
        newModel['geometry'] = <torusBufferGeometry attach='geometry' />
        break;

      case 'Tetrahedron':
        newModel['geometry'] = <tetrahedronBufferGeometry attach='geometry' />
        break;

      case 'Icosahedron':
        newModel['geometry'] = <icosahedronBufferGeometry attach='geometry' />
        break;

      case 'Octahedron':
        newModel['geometry'] = <octahedronBufferGeometry attach='geometry' />
        break;

      case 'Dodecahedron':
        newModel['geometry'] = <dodecahedronBufferGeometry attach='geometry' />
        break;

      default:
        break;
    }

    setModelData(newModel);
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
