import React, { useEffect, useRef } from 'react';
import { OrbitControls, TransformControls } from '@react-three/drei';
import { useProperty, useTarget, useScene, useGroup, useLight, useModel } from './context.js';

// Transform Controls
export function Controls() {
  const { currentTransformMode, setCurrentTransformMode } = useProperty();
  const { targetMesh} = useTarget();
  const { setIsDragging } = useScene();
  const { groupList, setStatesList, resetUndoLists } = useGroup();

  // Transform Controls reference so that we can change its properties
  const transformRef = useRef();


    //function to save the state history
  function serialize() {
    const serialized = {
      models: [],
      lights: [],
    };

    for (const thing of groupList) {
      // check if this thing is a model or a light
      // and put it in the correct category
      if (thing.children[0]) {
        console.log(thing);
        serialized.lights.push({
          uuid: Math.random(),
          position: thing.position,
          type: thing.children[0].type,
        });
      } else {
        let color = thing.material.color;

        if (typeof color != 'object') {
          console.log(color);
        }

        serialized.models.push({
            uuid: Math.random(),
            position: thing.position,
            rotation: thing.rotation.toVector3(),
            scale: thing.scale,
            color: { r: color.r, g: color.g, b: color.b },
            geometryType: thing.geometry.type,
            name: thing.name,
            });
      }
    }

    // saver = serialized;
    setStatesList(JSON.stringify(serialized));
  }

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
            controls.attach(targetMesh);
            controls.setMode('translate');
            setCurrentTransformMode(controls.mode);
            break;

          case 'e':
            controls.attach(targetMesh);
            controls.setMode('scale');
            setCurrentTransformMode(controls.mode);
            break;

          case 'r':
            controls.attach(targetMesh);
            controls.setMode('rotate');
            setCurrentTransformMode(controls.mode);
            break;
          case 'd':
            controls.detach();
            break;
          case 't':
            controls.visible = !controls.visible;
            break;

          default:
            if (isFinite(event.key)) {
              serialize();
            }
            break;
        }
      };

      const callback = (event) => {
        setIsDragging(event.value);
        if (event.value) {
          serialize();
        }
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
