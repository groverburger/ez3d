import React, { useEffect, useRef } from 'react';
import { useGroup, useModel, useLight, useTarget } from './context.js';

/**
 * Group: this handles the object that holds all of the meshes and lights
 *
 * @returns {object} JSX containing group component
 */
export function Group({ children }) {
  const { setGroupList } = useGroup();
  const { modelData } = useModel();
  const { lightData, setLightWindowToggle, setLightWindowType } = useLight();
  const { transformRef, setHoveredMesh, setTargetMesh } = useTarget();

  const groupRef = useRef();

  //handlePointerMissed handles deselecting and opens a general scene window
  const handlePointerMissed = () => {
    setTargetMesh(null);
    document.dispatchEvent(new KeyboardEvent('keydown',{'key':'d'}));
    setLightWindowType(null);
    setLightWindowToggle(false);
  };

  //When there is a change to the modelData or lightData it updates the groupRef
  useEffect(() => {
    if (groupRef.current) {
      const group = groupRef.current;

      console.log(
        group.children && 'Current meshes in group are: ',
        group.children
      );
      //adds new member to groupRef
      group.children.forEach((mesh) => {
        setGroupList(mesh);
      });
    }
  }, [modelData, lightData, setGroupList]);

  //returns group component
  //handles pointer over, out, or miss on any member of the group
  return (
    <group
      ref={groupRef}
      onPointerOver={(event) => setHoveredMesh({ current: event.object })}
      onPointerOut={() => setHoveredMesh(null)}
      onPointerMissed={() => handlePointerMissed()}
    >
      {children}
    </group>
  );
}
