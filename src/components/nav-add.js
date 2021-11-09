import { NavDropdown } from 'react-bootstrap';
import { useModel, useLight } from './context';
import '../styles/navbar.css';

export default function NavAdd() {
  const { modelData, setModelData } = useModel();
  const { lightData, setLightData } = useLight();

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

  // When generating a new shape, push an object containing the properties of the new shape to the model list
  function generateNewShape(event) {
    const totalModels = modelData.length;

    switch (event.target.innerHTML) {
      case 'Cube':
        const newCube = {
          position: { position: [0, 0, 0] },
          type: 'cube',
          uuid: Math.random(),
        };
        setModelData(newCube);
        break;

      case 'Sphere':
        const newSphere = {
          position: { position: [0, 0, 0] },
          type: 'sphere',
          uuid: Math.random(),
        };
        setModelData(newSphere);
        break;

      case 'Cylinder':
        const newCylinder = {
          position: { position: [0, 0, 0] },
          type: 'cylinder',
          uuid: Math.random(),
        };
        setModelData(newCylinder);
        break;

      default:
        break;
    }

    console.log(totalModels);
  }

  // When generating a new light, push an object containing the properties of the new light to the light list
  function generateNewLight(event) {
    const totalLights = lightData.length;

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
          position: { position: [0, 0, 0] },
          type: 'point',
          uuid: Math.random(),
        };
        setLightData(newPoint);
        break;

      default:
        break;
    }

    console.log(totalLights);
  }
}
