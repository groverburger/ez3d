import React, { useEffect, useRef } from 'react';
import { TransformControls } from '@react-three/drei';
import { useProperty,useTarget,useGroup,useModel,useLight} from './context';

// Transform Controls
export default function Controls(props) {
  const { currentTransformMode, setCurrentTransformMode } = useProperty();
  const { setTargetMesh,targetMesh,setHoveredMesh } = useTarget();
  const { delGroupList,groupList } = useGroup();
  const { modelData,deleteModelData } = useModel();
  const { deleteLightData,lightData } = useLight();

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
          
          //deselect target mesh
          case "Escape":
            setTargetMesh(null);
            break;

          //print the targetmesh info in console
          case 'p':
            console.log(targetMesh);
            // console.log("Grouplist:", groupList);
            // console.log("LightData:", lightData);
              
            
            break;
          
          //delete selected mesh
          case "Backspace":
            //deselect the mesh
            setHoveredMesh(null);
            setTargetMesh(null);

            //switch cases if mesh or light
            const beforeLength = modelData.length;
            deleteModelData(targetMesh);

            //if nothing happened to modelList, a light must be deleted
            if(beforeLength == modelData.length){
              var lightIndex = -1;
              var totalLightsMinusOne = -1;

              //first cycle through groupList, the list of objects
              groupList.forEach((entry, i) => {

              //if a light is found, increment totalLightsMinusOne
                if(!(entry.uuid < 1)){
                  totalLightsMinusOne += 1;

                  //if the entry at the index is the targetmesh, set the lightIndexIndex to totalLightsMinusOne
                  if(entry == targetMesh){
                    lightIndex = totalLightsMinusOne;
                    
                  }
                }
              });

              //perform the delete function on the lightData list of lights
              //indexes of lightData list is reversed compared to groupList
              deleteLightData(totalLightsMinusOne - lightIndex);
            }
            
            //delete the mesh data from the groupList
            delGroupList(targetMesh);
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
