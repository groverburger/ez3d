import { NavDropdown } from 'react-bootstrap';
import { useModel, useLight } from './context';
import '../styles/navbar.css';

export default function NavAdd() {
  const { modelList, setModelList } = useModel();
  const { lightList, setLightList } = useLight();

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

  function generateNewShape(event) {
    const totalModels = modelList.length;

    switch (event.target.innerHTML) {
      case 'Cube':
        const newCube = { position: [0, 0, 0], type: 'cube' };
        setModelList(newCube);
        break;

      case 'Sphere':
        const newSphere = { position: [0, 0, 0], type: 'sphere' };
        setModelList(newSphere);
        break;

      case 'Cylinder':
        const newCylinder = { position: [0, 0, 0], type: 'cylinder' };
        setModelList(newCylinder);
        break;

      default:
        break;
    }

    console.log(totalModels);
  }

  function generateNewLight(event) {
    const totalLights = lightList.length;

    switch (event.target.innerHTML) {
      case 'Ambient Light':
        const newAmbient = { position: [0, 0, 0], type: 'ambient' };
        setLightList(newAmbient);
        break;

      case 'Directional Light':
        const newDirectional = { position: [0, -2.5, 0], type: 'directional' };
        setLightList(newDirectional);
        break;

      case 'Point Light':
        const newPoint = { position: [0, 0, 0], type: 'point' };
        setLightList(newPoint);
        break;

      default:
        break;
    }

    console.log(totalLights);
  }
}
