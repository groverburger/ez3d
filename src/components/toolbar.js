import React, { useContext } from 'react';
import { ReactComponent as TranslateIcon } from '../icons/translate.svg';
import { ReactComponent as RotateIcon } from '../icons/rotate.svg';
import { ReactComponent as ScaleIcon } from '../icons/scale.svg';
import { ButtonGroup, Button } from 'react-bootstrap';
import { TransformContext } from './context';

import './toolbar.css';

export default function Toolbar() {
  const icons = {
    'translate': <TranslateIcon />,
    'scale': <ScaleIcon />,
    'rotate': <RotateIcon />,
  };
  
  const [transform, setTransform] = useContext(TransformContext);
  const select = ['translate', 'scale', 'rotate'];

  return (
    <div className='toolbar'>
      <ButtonGroup vertical>
        {select.map(type => (
          <Button className='btn-light toolbar-items' key={type} active={transform === type}
          onClick={() => {
            setTransform(type)
          }}>{icons[type]}</Button>)
        )}
      </ButtonGroup>
    </div>
  );
}
