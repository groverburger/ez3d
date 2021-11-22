import {useTarget, useScene } from './context';
import { Button } from 'react-bootstrap';
import { ReactComponent as EyeIcon } from '../icons/eye.svg';
import { ReactComponent as EyeCrossedIcon } from '../icons/eyeCrossed.svg';
import '../styles/toolbar.css';

export default function Visibility() {
  const { targetMesh } = useTarget();
  const {isMeshVisible, setVisibility} = useScene();

  const handleChange = (event) => {
    if (targetMesh) {
      targetMesh.visible = !targetMesh.visible;
      if(isMeshVisible == true){
        setVisibility(false);
      }else{
        setVisibility(true);
      }
    }
  };

  return (
    <Button
      className='btn-light toolbar-items'
      onClick={(event) => handleChange(event)}
    >
      {targetMesh ? (targetMesh.visible ? <EyeIcon/> : <EyeCrossedIcon/>) : null}
    </Button>
  );
}
