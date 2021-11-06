import React, { useContext, useEffect, useRef } from 'react';
import { TransformControls, useHelper } from '@react-three/drei';
import { DirectionalLightHelper, PointLightHelper } from 'three';
import { RangeContext, TransformDragContext } from './context';

export const AmbientLight = (props) => {
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  const rangeValue = useContext(RangeContext);
  const range = rangeValue;

  const lightRef = useRef();

  useEffect(() => {
    if (lightRef.current) {
      const light = lightRef.current;

      console.log(light);

      light.intensity = range / 100;
    }
  });

  return (
    <mesh
      scale={[0.1, 0.1, 0.1]}
      position={[0, 2, 0]}
      onClick={() => handleLightClick(props.type)}
      onPointerMissed={() => handleWindowClose(props.type)}
    >
      <sphereBufferGeometry attach='geometry' />
      <meshLambertMaterial attach='material' {...props.properties.color} />
      <ambientLight {...props.properties} ref={lightRef} />
    </mesh>
  );
};

export const DirectionalLight = (props) => {
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  const dragValue = useContext(TransformDragContext);
  const setTransformDrag = dragValue;

  const rangeValue = useContext(RangeContext);
  const range = rangeValue;

  const transformRef = useRef();
  const lightRef = useRef();
  useHelper(lightRef, DirectionalLightHelper, 5);

  useEffect(() => {
    if (lightRef.current && transformRef.current) {
      const light = lightRef.current;
      const transform = transformRef.current;

      console.log(light);

      light.intensity = range / 100;

      const callback = (event) => {
        setTransformDrag(event.value);
      };

      transform.addEventListener('dragging-changed', callback);
      return () => {
        transform.removeEventListener('dragging-changed', callback);
      };
    }
  });

  return (
    <TransformControls size={0.2} position={[0, 2, 0]} ref={transformRef}>
      <mesh
        scale={[0.1, 0.1, 0.1]}
        position={[0, 0, 0]}
        onClick={() => handleLightClick(props.type)}
        onPointerMissed={() => handleWindowClose(props.type)}
      >
        <sphereBufferGeometry attach='geometry' />
        <meshLambertMaterial attach='material' {...props.properties.color} />
        <directionalLight
          {...props.properties}
          position={[0, -2.5, 0]}
          ref={lightRef}
        />
      </mesh>
    </TransformControls>
  );
};

export const PointLight = (props) => {
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  const dragValue = useContext(TransformDragContext);
  const setTransformDrag = dragValue;

  const rangeValue = useContext(RangeContext);
  const range = rangeValue;

  const transformRef = useRef();
  const lightRef = useRef();
  useHelper(lightRef, PointLightHelper, 5);

  useEffect(() => {
    if (lightRef.current && transformRef.current) {
      const light = lightRef.current;
      const transform = transformRef.current;

      console.log(light);

      light.intensity = range / 100;

      const callback = (event) => {
        setTransformDrag(event.value);
      };

      transform.addEventListener('dragging-changed', callback);
      return () => {
        transform.removeEventListener('dragging-changed', callback);
      };
    }
  });

  return (
    <TransformControls size={0.2} position={[0, 2, 0]} ref={transformRef}>
      <mesh
        scale={[0.1, 0.1, 0.1]}
        position={[0, 0, 0]}
        onClick={() => handleLightClick(props.type)}
        onPointerMissed={() => handleWindowClose(props.type)}
      >
        <sphereBufferGeometry attach='geometry' />
        <meshLambertMaterial attach='material' {...props.properties.color} />
        <pointLight {...props.properties} position={[0, 0, 0]} ref={lightRef} />
      </mesh>
    </TransformControls>
  );
};
