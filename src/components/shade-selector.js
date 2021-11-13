import { ButtonGroup, Button } from 'react-bootstrap';
import { useProperty, useTarget } from './context';

export default function ShadeSelect() {
  const { setCurrentShade } = useProperty();
  const { targetMesh } = useTarget();

  function handleWireframe() {
    if (targetMesh) {
      targetMesh.material.wireframe = true;
      targetMesh.material.flatShading = false;
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
    if (targetMesh) {
      targetMesh.material.flatShading = false;
      targetMesh.material.wireframe = false;
    }

    setCurrentShade('smooth');
  }

  return (
    <ButtonGroup>
      <Button
        className='btn-light object-list-items'
        onClick={() => handleWireframe()}
      >
        Wireframe
      </Button>
      <Button
        className='btn-light object-list-items'
        onClick={() => handleSmooth()}
      >
        Smooth
      </Button>
    </ButtonGroup>
  );
}
