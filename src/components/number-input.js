import React, { useEffect } from 'react';
import { ReactComponent as TranslateIcon } from '../icons/translate.svg';
import { ReactComponent as RotateIcon } from '../icons/rotate.svg';
import { ReactComponent as ScaleIcon } from '../icons/scale.svg';
import { useProperty, useTarget, useScene } from './context';

import '../styles/number-input.css';

export default function Number() {
  const icons = {
    translate: <TranslateIcon />,
    scale: <ScaleIcon />,
    rotate: <RotateIcon />,
  };
  const select = ['translate', 'scale', 'rotate'];

  const { currentTransform, setCurrentTransform } = useProperty();
  const { targetMesh } = useTarget();
  const { isDragging } = useScene();

  useEffect(() => {
    if (!isDragging) {
      return;
    }
    setCurrentTransform({
      translate: targetMesh.position,
      rotate: targetMesh.rotation,
      scale: targetMesh.scale,
    });
  }, [targetMesh, currentTransform, setCurrentTransform, isDragging]);

  const handleNumberChange = (event, type) => {
    switch (type) {
      case 'translate':
        if (event.target.name === 'translate-X') targetMesh.position.x = parseFloat(event.target.value);
        else if (event.target.name === 'translate-Y') targetMesh.position.y = parseFloat(event.target.value);
        else targetMesh.position.z = parseFloat(event.target.value);
        break;

      case 'scale':
        if (event.target.name === 'scale-X') targetMesh.scale.x = parseFloat(event.target.value);
        else if (event.target.name === 'scale-Y') targetMesh.scale.y = parseFloat(event.target.value);
        else targetMesh.scale.z = parseFloat(event.target.value);
        break;

      case 'rotate':
        if (event.target.name === 'rotate-X') targetMesh.rotation.x = parseFloat(event.target.value);
        else if (event.target.name === 'rotate-Y') targetMesh.rotation.y = parseFloat(event.target.value);
        else targetMesh.rotation.z = parseFloat(event.target.value);
        break;

      default:
        break;
    }

    setCurrentTransform({
      translate: targetMesh.position,
      rotate: targetMesh.rotation,
      scale: targetMesh.scale,
    });
  };

  return (
    <ul className='number-container'>
      {select.map((type) => (
        <div className='number-input-items' key={`number-input ${type}`}>
          <div className='number-input-icon'>{icons[type]}</div>
          <div className='number-input-wrapper'>
            <ul className='number-input-list'>
              <div className='number-box'>
                <input
                  type='number'
                  name={`${type}-X`}
                  min='-Infinity'
                  max='Infinity'
                  step={type === 'scale' ? '0.01' : '0.1'}
                  tabIndex='1'
                  value={+currentTransform[type].x.toFixed(2)}
                  onChange={(event) => handleNumberChange(event, type)}
                />
                <label className='axis'>
                  <span>X</span>
                </label>
              </div>
              <div className='number-box'>
                <input
                  type='number'
                  name={`${type}-Y`}
                  min='-Infinity'
                  max='Infinity'
                  step={type === 'scale' ? '0.01' : '0.1'}
                  tabIndex='1'
                  value={+currentTransform[type].y.toFixed(2)}
                  onChange={(event) => handleNumberChange(event, type)}
                />
                <label className='axis'>
                  <span>Y</span>
                </label>
              </div>
              <div className='number-box'>
                <input
                  type='number'
                  name={`${type}-Z`}
                  min='-Infinity'
                  max='Infinity'
                  step={type === 'scale' ? '0.01' : '0.1'}
                  tabIndex='1'
                  value={+currentTransform[type].z.toFixed(2)}
                  onChange={(event) => handleNumberChange(event, type)}
                />
                <label className='axis'>
                  <span>Z</span>
                </label>
              </div>
            </ul>
          </div>
        </div>
      ))}
    </ul>
  );
}
