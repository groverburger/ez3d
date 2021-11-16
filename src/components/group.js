import React, { useEffect, useRef } from 'react';
import { useGroup, useModel, useLight, useTarget } from './context';

export default function Group({ children }) {
  const { setGroupList } = useGroup();
  const { modelData } = useModel();
  const { lightData, setLightWindowToggle, setLightWindowType } = useLight();
  const { setHoveredMesh, setTargetMesh } = useTarget();

  const groupRef = useRef();

  const handlePointerMissed = () => {
    setTargetMesh(null);
    setLightWindowType(null);
    setLightWindowToggle(false);
  }

  useEffect(() => {
    if (groupRef.current) {
      const group = groupRef.current;

      console.log(group.children && 'Current meshes in group are: ',group.children);
      group.children.forEach((mesh) => {
        setGroupList(mesh);
      });
    }
  }, [modelData, lightData, setGroupList]);

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
