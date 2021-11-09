import React, { useRef } from 'react';
import { useTransform } from './context';

export default function ModelRenderer(props) {
  const meshRef = useRef();
  const { setTargetToTransform } = useTransform();

  const propsCopy = Object.assign({}, props.data);
  delete propsCopy.type;

  return (
    <>
      <mesh
        {...propsCopy}
        onClick={(event) => setTargetToTransform(event.object)}
        ref={meshRef}
      >
        {props.data.type === 'cube' ? (
          <>
            <boxBufferGeometry attach='geometry' />
            <meshLambertMaterial attach='material' color='hotpink' />
          </>
        ) : null}

        {props.data.type === 'cylinder' ? (
          <>
            <cylinderBufferGeometry attach='geometry' />
            <meshLambertMaterial attach='material' color='green' />
          </>
        ) : null}

        {props.data.type === 'sphere' ? (
          <>
            <sphereBufferGeometry attach='geometry' />
            <meshLambertMaterial attach='material' color='blue' />
          </>
        ) : null}
      </mesh>
    </>
  );
}
