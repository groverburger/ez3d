import { ButtonGroup, Button } from 'react-bootstrap';
import { ReactComponent as TranslateIcon } from '../icons/translate.svg';
import { ReactComponent as RotateIcon } from '../icons/rotate.svg';
import { ReactComponent as ScaleIcon } from '../icons/scale.svg';
import { useProperty, useTarget } from './context.js';

import '../styles/toolbar.css';

export default function Toolbar() {
  const icons = {
    translate: <TranslateIcon />,
    scale: <ScaleIcon />,
    rotate: <RotateIcon />,
  };
  const select = ['translate', 'scale', 'rotate'];

  const { currentTransformMode, setCurrentTransformMode } = useProperty();
  const { targetMesh } = useTarget();

  return (
    <div className='toolbar'>
      <ButtonGroup vertical>
        {select.map((type) => (
          <Button
            className='btn-light toolbar-items'
            key={`toolbar ${type}`}
            active={targetMesh && currentTransformMode === type}
            onClick={targetMesh ? () => setCurrentTransformMode(type) : null} // When clicked, change transform type
          >
            {icons[type]}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
