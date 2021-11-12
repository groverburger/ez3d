import { ReactComponent as TranslateIcon } from '../icons/translate.svg';
import { ReactComponent as RotateIcon } from '../icons/rotate.svg';
import { ReactComponent as ScaleIcon } from '../icons/scale.svg';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useTransform, useTarget } from './context';

import '../styles/toolbar.css';

export default function Toolbar() {
  const icons = {
    translate: <TranslateIcon />,
    scale: <ScaleIcon />,
    rotate: <RotateIcon />,
  };
  const select = ['translate', 'scale', 'rotate'];

  const { transformType, setTransformType } = useTransform();
  const { targetMesh } = useTarget();

  return (
    <div className='toolbar'>
      <ButtonGroup vertical>
        {select.map((type) => (
          <Button
            className='btn-light toolbar-items'
            key={type}
            active={targetMesh && transformType === type}
            onClick={targetMesh ? () => setTransformType(type) : null} // When clicked, change transform type
          >
            {icons[type]}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
