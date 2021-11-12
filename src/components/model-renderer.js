import React, { useRef } from 'react';
import { useColor, useTarget } from './context';
import { convertColor } from './color-converter';

export default function ModelRenderer(props) {
  const meshRef = useRef();
  const { setTargetMesh } = useTarget();
  const { setCurrentColor } = useColor();

  const handleClick = (mesh) => {
    setTargetMesh(mesh);
    setCurrentColor(convertColor(mesh.material.color));
  };

  return (
    <>
      <mesh
        {...props.position}
        onClick={(event) => handleClick(event.object)}
        ref={meshRef}
      >
        {props.type === 'cube' ? (
          <>
            <boxBufferGeometry attach='geometry' />
            <meshStandardMaterial attach='material' color='hotpink' />
          </>
        ) : null}

        {props.type === 'cylinder' ? (
          <>
            <cylinderBufferGeometry attach='geometry' />
            <meshStandardMaterial attach='material' color='green' />
          </>
        ) : null}

        {props.type === 'sphere' ? (
          <>
            <sphereBufferGeometry attach='geometry' />
            <meshStandardMaterial attach='material' color='blue' />
          </>
        ) : null}
      </mesh>
    </>
  );
}
