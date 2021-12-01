import { ButtonGroup, Button } from 'react-bootstrap';
import { useProperty, useTarget } from './context.js';

/**
 * ShadeSelect: Check which mesh is selected, then change that mesh's
 * shading mode (wireframe, flatShading, smooth shading)
 *
 * @returns {object} JSX containing the shading selection ButtonGroup
 */
export function ShadeSelect() {
  const { setCurrentShade } = useProperty();
  const { targetMesh } = useTarget();

  //Handle's Wireframe button event
  function handleWireframe() {
    //Change the selected mesh material properties(flatShading,wireframe)
    if (targetMesh) {
      targetMesh.material.flatShading = false;
      targetMesh.material.wireframe = true;
    }
    setCurrentShade('wireframe');
  }
  //Handle's flatShading button event
  function handleFaceted() {
    //Change the selected mesh material properties(flatShading,wireframe)
    if (targetMesh) {
      targetMesh.material.flatShading = true;
      targetMesh.material.wireframe = false;
      // needs to manually update the material to re-render change
      targetMesh.material.needsUpdate = true;
    }
    setCurrentShade('flat');
  }
  //Handle's Smooth Shading button event
  function handleSmooth() {
    //Change the selected mesh material properties(flatShading,wireframe)
    if (targetMesh) {
      targetMesh.material.flatShading = false;
      targetMesh.material.wireframe = false;
      // needs to manually update the material to re-render change
      targetMesh.material.needsUpdate = true;
    }
    setCurrentShade('smooth');
  }
  //ButtonGroup with the Three Shading Options as buttons
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
