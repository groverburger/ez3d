import React, { useContext, useEffect, useRef } from 'react';
import { TransformControls } from '@react-three/drei';
import { TransformContext } from './context';

export default function Controls(props) {
  const value = useContext(TransformContext);
  const [transform, setTransform] = value;

  const transformRef = useRef();

  useEffect(() => {
    if (transformRef.current) {
      const controls = transformRef.current;

      if (!transform) {
        controls.mode = 'translate';
        setTransform(controls.mode);
      } else {
        controls.mode = transform;
      }

      const handleKeyDown = (event) => {
        switch (event.key) {
          case 'w':
            controls.mode = 'translate';
            setTransform(controls.mode);
            break;

          case 'e':
            controls.mode = 'scale';
            setTransform(controls.mode);
            break;

          case 'r':
            controls.mode = 'rotate';
            setTransform(controls.mode);
            break;

          case 't':
            controls.visible = !controls.visible;
            break;

          default:
            break;
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  });

  return (
    <TransformControls size={0.4} object={props.object} ref={transformRef} />
  );
}
