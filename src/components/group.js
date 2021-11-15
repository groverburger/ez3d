import React, { useEffect, useRef } from 'react';
import { useGroup, useModel, useLight } from './context';

export default function Group({ children }) {
  const { setGroupList } = useGroup();
  const { modelData } = useModel();
  const { lightData } = useLight();

  const groupRef = useRef();

  useEffect(() => {
    if (groupRef.current) {
      const group = groupRef.current;

      group.children.forEach((child) => {
        setGroupList(child);
        console.log("child is: ", child);
      })
      
    }
  }, [modelData, lightData, setGroupList]);
  return (
    <group ref={groupRef}>
      {children}
    </group>
  );
}
