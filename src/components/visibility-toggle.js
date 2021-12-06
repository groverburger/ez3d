import { Button } from 'react-bootstrap';
import { ReactComponent as EyeIcon } from '../icons/eye.svg';
import { ReactComponent as EyeCrossedIcon } from '../icons/eye-crossed.svg';
import {useTarget, useScene } from './context.js';
import '../styles/toolbar.css';

/**
 * Visibility: turns the selected mesh's Visibility on/off
 *
 * @returns {object} JSX containing the shading selection ButtonGroup
 */
export function Visibility() {
  const { targetMesh } = useTarget();
  const { isMeshVisible, setVisibility } = useScene();
  //sets the meshs property, visible, to the opposite of its current boolean
  const handleChange = (event) => {
    if (targetMesh) {
      targetMesh.visible = !targetMesh.visible;
      if(isMeshVisible === true){
        setVisibility(false);
      }else{
        setVisibility(true);
      }
    }
  };
  //Button that has a changing svg depending whether the mesh is visisble
  return (
    <Button
      className='btn-light toolbar-items'
      onClick={(event) => handleChange(event)}
    >
      {targetMesh ? (targetMesh.visible ? <EyeIcon/> : <EyeCrossedIcon/>) : null}
    </Button>
  );
}
