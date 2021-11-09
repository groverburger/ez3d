import React, { useEffect, useRef } from 'react';
import { TransformControls } from '@react-three/drei';
import { useTransform } from './context';

// Transform Controls
export default function Controls(props) {
  const { transformType, setTransformType } = useTransform();

  // Transform Controls reference so that we can change its properties
  const transformRef = useRef();

  useEffect(() => {
    if (transformRef.current) {
      const controls = transformRef.current;

      if (!transformType) {
        controls.mode = 'translate';
        setTransformType(controls.mode);
      } else {
        controls.mode = transformType;
      }

      const handleKeyDown = (event) => {
        switch (event.key) {
          case 'w':
            controls.mode = 'translate';
            setTransformType(controls.mode);
            break;

          case 'e':
            controls.mode = 'scale';
            setTransformType(controls.mode);
            break;

          case 'r':
            controls.mode = 'rotate';
            setTransformType(controls.mode);
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
