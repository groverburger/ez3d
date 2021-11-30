import { ButtonGroup, Button } from 'react-bootstrap';
import { useProperty, useTarget } from './context.js';

export default function ShadeSelect() {
  const { setCurrentShade } = useProperty();
  const { targetMesh} = useTarget();

  function handleWireframe() {
    if (targetMesh) {
      targetMesh.material.flatShading = false;
      targetMesh.material.wireframe = true;
    }
    setCurrentShade('wireframe');
  }

  function handleFaceted() {
    if(targetMesh){
      targetMesh.material.flatShading = true;
      targetMesh.material.wireframe = false;
      targetMesh.material.needsUpdate = true;
    }
    setCurrentShade('flat');
  }
  function handleSmooth() {
    if (targetMesh) {
      targetMesh.material.flatShading = false;
      targetMesh.material.wireframe = false;
      targetMesh.material.needsUpdate = true;
    }
    setCurrentShade('smooth');
  }

  return (
    <ButtonGroup>
      <Button
        className='btn-light scene-window-items'
        onClick={() => handleWireframe()}
      >
        Wireframe
      </Button>

      <Button
        className='btn-light scene-window-items'
        onClick={() => handleFaceted()}
      >
        Flat
      </Button>

      <Button
        className='btn-light scene-window-items'
        onClick={() => handleSmooth()}
      >
        Smooth
      </Button>
    </ButtonGroup>
  );
}
