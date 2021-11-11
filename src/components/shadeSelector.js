import { ButtonGroup, Button } from 'react-bootstrap';
import { useShader } from './context';

export default function ShadeSelect() {
  const { targetToShade, currentShade, setCurrentShade } = useShader();

  function handleWireframe() {
    if(targetToShade){
      targetToShade.material.wireframe = true;
      targetToShade.material.flatShading = false;
    }

    setCurrentShade('wireframe');
  }
  // BUG: there is a bug with flatShading attribute in meshStandardMaterial
  // Ignore for now

  // function handleFaceted() {
  //   if(targetToShade){
  //     targetToShade.material.wireframe = false;
  //     targetToShade.material.flatShading = true;
  //   }
  //   setCurrentShade('flatShading');
  // }
  function handleSmooth() {
    if(targetToShade){
      targetToShade.material.flatShading = false;
      targetToShade.material.wireframe = false;
    }

    setCurrentShade('smooth');
  }

    return (
      <ButtonGroup>
        <Button className='btn-light object-list-items' onClick={() => {handleWireframe()}}>Wireframe</Button>
        <Button className='btn-light object-list-items' onClick={() => {handleSmooth()}}>Smooth</Button>
      </ButtonGroup>
    );
  }
