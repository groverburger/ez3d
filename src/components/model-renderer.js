import React, { useRef } from 'react';
import { useTransform, useColor, useShader } from './context';
import { convertColor } from './color-converter';

export default function ModelRenderer(props) {
  const meshRef = useRef();
  const { setTargetToTransform } = useTransform();
  const { setCurrentColor, setTargetToColor } = useColor();
  const { setCurrentShade, setTargetToShade } = useShader();

  const handleClick = (event) => {
    setTargetToTransform(event.object);
    setTargetToColor(event.object);
    setTargetToShade(event.object);
    setCurrentColor(convertColor(event.object.material.color));
  };

  return (
    <>
      <mesh
        {...props.position}
        onClick={(event) => handleClick(event)}
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
