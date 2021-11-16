import React, { useEffect, useRef } from 'react';
import { OrbitControls, TransformControls } from '@react-three/drei';
import { useProperty, useTarget, useScene } from './context';

// Transform Controls
export default function Controls() {
  const { currentTransformMode, setCurrentTransformMode } = useProperty();
  const { targetMesh } = useTarget();
  const { setIsDragging } = useScene();

  // Transform Controls reference so that we can change its properties
  const transformRef = useRef();

  useEffect(() => {
    if (transformRef.current) {
      const controls = transformRef.current;

      if (currentTransformMode) {
        controls.setMode(currentTransformMode);
      } else {
        setCurrentTransformMode(controls.mode);
      }

      const handleKeyDown = (event) => {
        switch (event.key) {
          case 'w':
            controls.setMode('translate');
            setCurrentTransformMode(controls.mode);
            break;

          case 'e':
            controls.setMode('scale');
            setCurrentTransformMode(controls.mode);
            break;

          case 'r':
            controls.setMode('rotate');
            setCurrentTransformMode(controls.mode);
            break;

          case 't':
            controls.visible = !controls.visible;
            break;

          default:
            break;
        }
      };

      const callback = (event) => {
        setIsDragging(event.value);
      };

      controls.addEventListener('dragging-changed', callback);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        controls.removeEventListener('dragging-changed', callback);
      };
    }
  });

  return (
    <>
      {targetMesh && (
        <TransformControls ref={transformRef} size={0.4} object={targetMesh} />
      )}
      <OrbitControls makeDefault dampingFactor={0.3} />
    </>
  );
}
