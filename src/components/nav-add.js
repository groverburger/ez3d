import { NavDropdown } from 'react-bootstrap';
import { useModel, useLight, useGroup } from './context.js';
import '../styles/navbar.css';

export function NavAdd() {
  const { setModelData } = useModel();
  const { setLightData } = useLight();
  const { setStatesList, groupList } = useGroup();

  return (
    <div className='navbar-items'>
      <NavDropdown title='Add' id='add-dropdown'>
        <NavDropdown.Item
          href='#action/1.0'
          onClick={() => generateNewShape('BoxGeometry', 'cornFlowerBlue')}
        >
          Cube
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.1'
          onClick={() => generateNewShape('SphereGeometry', 'purple')}
        >
          Sphere
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={() => generateNewShape('CylinderGeometry', 'yellow')}
        >
          Cylinder
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={() => generateNewShape('ConeGeometry', 'crimson')}
        >
          Cone
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={() => generateNewShape('TorusGeometry', 'orange')}
        >
          Torus
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={() => generateNewShape('TetrahedronGeometry', 'seagreen')}
        >
          Tetrahedron
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={() => generateNewShape('IcosahedronGeometry', 'hotpink')}
        >
          Icosahedron
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={() => generateNewShape('OctahedronGeometry', 'tomato')}
        >
          Octahedron
        </NavDropdown.Item>
        <NavDropdown.Item
          href='#action/1.2'
          onClick={() => generateNewShape('DodecahedronGeometry', 'slateblue')}
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

    //function to save the state
  function serialize() {
    const serialized = {
      models: [],
      lights: [],
    };

    for (const thing of groupList) {
      // check if this thing is a model or a light
      // and put it in the correct category
      if (thing.children[0]) {
        console.log(thing);

        serialized.lights.push({
          uuid: Math.random(),
          position: thing.position,
          type: thing.children[0].type,
        });
      } else {
        let color = thing.material.color;

        if (typeof color != 'object') {
          console.log(color);
        }

        serialized.models.push({
          uuid: Math.random(),
          position: thing.position,
          rotation: thing.rotation.toVector3(),
          scale: thing.scale,
          color: { r: color.r, g: color.g, b: color.b },
          geometryType: thing.geometry.type,
          name: thing.name,
        });
      }
    }

    // saver = serialized;
    setStatesList(JSON.stringify(serialized));
  }

  function generateNewShape(geometryType, color) {
    serialize();
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
          position: { x: 0, y: 0, z: 0 },
          type: 'AmbientLight',
          uuid: Math.random(),
        };
        setLightData(newAmbient);
        break;

      case 'Directional Light':
        const newDirectional = {
          position: { x: 0, y: -2.5, z: 0 },
          type: 'DirectionalLight',
          uuid: Math.random(),
        };
        setLightData(newDirectional);
        break;

      case 'Point Light':
        const newPoint = {
          position: { x: 0, y: 6.5, z: 0 },
          type: 'PointLight',
          uuid: Math.random(),
        };
        setLightData(newPoint);
        break;

      default:
        break;
    }
  }
}
