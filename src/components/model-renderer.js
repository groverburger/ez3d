import React, { useRef } from 'react';
import { useTransform } from './context';

export default function ModelRenderer(props) {
  const meshRef = useRef();
  const { setTargetToTransform } = useTransform();

  // Make a copy of the properties in the model list so that we can delete the type property.
  // This is done because we can't pass the object as a position prop if there are more than one properties
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
