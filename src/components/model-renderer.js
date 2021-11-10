import React, { useRef } from 'react';
import { useTransform, useColor } from './context';

export default function ModelRenderer(props) {
  const meshRef = useRef();
  const { setTargetToTransform } = useTransform();
  const { setTargetToColor, colorChange } = useColor();

  return (
    <>
      <mesh
        {...props.position}
        onClick={(event) => {
          setTargetToTransform(event.object);
          setTargetToColor(event.object);
        }}
        ref={meshRef}
      >
        {props.type === 'cube' ? (
          <>
            <boxBufferGeometry attach='geometry' />
            <meshLambertMaterial attach='material' color={colorChange}/>
          </>
        ) : null}

        {props.type === 'cylinder' ? (
          <>
            <cylinderBufferGeometry attach='geometry' />
            <meshLambertMaterial attach='material' color='green' />
          </>
        ) : null}

        {props.type === 'sphere' ? (
          <>
            <sphereBufferGeometry attach='geometry' />
            <meshLambertMaterial attach='material' color='blue' />
          </>
        ) : null}
      </mesh>
    </>
  );
}
