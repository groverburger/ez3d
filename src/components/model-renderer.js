import React, { useRef } from 'react';
import { useModel, useProperty, useTarget } from './context';
import { convertColor } from './color-converter';

export default function ModelRenderer(props) {
  const meshRef = useRef();
  const { setTargetMesh } = useTarget();
  const { setCurrentColor, setCurrentTransform } = useProperty();
  const { setIsModelWindowOpen } = useModel();

  const handleClick = (mesh) => {
    setTargetMesh(mesh);
    setCurrentColor(convertColor(mesh.material.color));
    setCurrentTransform({
      translate: mesh.position,
      rotate: mesh.rotation.toVector3(),
      scale: mesh.scale,
    });
    setIsModelWindowOpen(true);
  };

  return (
    <>
      <mesh
        {...props}
        ref={meshRef}
        onClick={(event) => handleClick(event.object)}
        onPointerMissed={() => setIsModelWindowOpen(false)}
        castShadow
      >
        <meshStandardMaterial
          attach='material'
          color={props.color || 'black'}
        />
      </mesh>
    </>
  );
}
