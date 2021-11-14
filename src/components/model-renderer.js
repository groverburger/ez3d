import React, { useRef } from 'react';
import { useProperty, useTarget } from './context';
import { convertColor } from './color-converter';

export default function ModelRenderer(props) {
  const meshRef = useRef();
  const { setTargetMesh, setHoveredMesh } = useTarget();
  const { setCurrentColor } = useProperty();

  const handleClick = (mesh) => {
    setTargetMesh(mesh);
    setCurrentColor(convertColor(mesh.material.color));
  };

  return (
    <>
      <mesh
        {...props}
        ref={meshRef}
        onClick={(event) => handleClick(event.object)}
        onPointerOver={() => setHoveredMesh(meshRef)}
        onPointerOut={() => setHoveredMesh(null)}
        castShadow
      >
        <meshStandardMaterial attach='material' color={props.color || "black"} />
      </mesh>
    </>
  );
}
