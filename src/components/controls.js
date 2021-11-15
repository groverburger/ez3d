import React, { useEffect, useRef } from 'react';
import { TransformControls } from '@react-three/drei';
import { useProperty,useTarget,useGroup,useModel} from './context';

// Transform Controls
export default function Controls(props) {
  const { currentTransformMode, setCurrentTransformMode } = useProperty();
  const { setTargetMesh,targetMesh,setHoveredMesh } = useTarget();
  const { delGroupList } = useGroup();
  const { modelData,deleteModelData } = useModel();

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

          case "Escape":
            setTargetMesh(null);
            break;

          case "Backspace":
            setHoveredMesh(null);
            setTargetMesh(null);
            delGroupList(targetMesh);
            deleteModelData(targetMesh);

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
