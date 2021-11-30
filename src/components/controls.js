import React, { useEffect, useRef } from 'react';
import { OrbitControls, TransformControls } from '@react-three/drei';
import { useProperty, useTarget, useScene, useGroup, useLight, useModel} from './context';

// Transform Controls
export default function Controls() {
  const { currentTransformMode, setCurrentTransformMode } = useProperty();
  const { targetMesh } = useTarget();
  const { setIsDragging } = useScene();
  const { setGroupData, groupList } = useGroup();
  

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
        if(event.value){
            const serialized = {
            models: [],
            lights: [],
            }

            for (const thing of groupList) {
            // check if this thing is a model or a light
            // and put it in the correct category
            if (thing.children[0]) {
                console.log(thing)
                serialized.lights.push({
                uuid: Math.random(),
                position: thing.position,
                type: thing.children[0].type,
                })
            } else {
                let color = thing.material.color

                if (typeof(color) != "object") {
                console.log(color)
                }

                serialized.models.push({
                uuid: Math.random(),
                position: thing.position,
                rotation: thing.rotation.toVector3(),
                scale: thing.scale,
                color: {r: color.r, g: color.g, b: color.b},
                geometryType: thing.geometry.type,
                })
            }
            }
            console.log("this serialized ", serialized)
            // saver = serialized;
            setGroupData(JSON.stringify(serialized))
        }
      };

      const saveCallBack = (event) => {
          const serialized = {
            models: [],
            lights: [],
            }

            for (const thing of groupList) {
            // check if this thing is a model or a light
            // and put it in the correct category
            if (thing.children[0]) {
                console.log(thing)
                serialized.lights.push({
                uuid: Math.random(),
                position: thing.position,
                type: thing.children[0].type,
                })
            } else {
                let color = thing.material.color

                if (typeof(color) != "object") {
                console.log(color)
                }

                serialized.models.push({
                uuid: Math.random(),
                position: thing.position,
                rotation: thing.rotation.toVector3(),
                scale: thing.scale,
                color: {r: color.r, g: color.g, b: color.b},
                geometryType: thing.geometry.type,
                })
            }
            }
            console.log("this serialized ", serialized)
            // saver = serialized;
            setGroupData(JSON.stringify(serialized))
      }

      controls.addEventListener('dragging-changed', callback);
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('onmousedown', saveCallBack);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        controls.removeEventListener('dragging-changed', callback);
        document.removeEventListener('onmousedown', saveCallBack);
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
