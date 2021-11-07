import React, { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper, PointLightHelper } from 'three';
import { useTransform, useLight } from './context';

export const AmbientLight = (props) => {
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  const setTargetLight = useLight((state) => state.setTargetLight);
  const setIntensity = useLight((state) => state.setIntensity);

  return (
    <mesh
      scale={[0.1, 0.1, 0.1]}
      position={[0, 2, 0]}
      onClick={(event) => {
        setTargetLight(event.object.children[0]);
        setIntensity(event.object.children[0].intensity);
        handleLightClick(props.type);
      }}
      onPointerMissed={() => handleWindowClose(props.type)}
    >
      <sphereBufferGeometry attach='geometry' />
      <meshLambertMaterial attach='material' color='white' />
      <ambientLight {...props.positions} color='white' />
    </mesh>
  );
};

export const DirectionalLight = (props) => {
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  const setTargetToTransform = useTransform(
    (state) => state.setTargetToTransform
  );
  const setTargetLight = useLight((state) => state.setTargetLight);
  const setIntensity = useLight((state) => state.setIntensity);

  const lightRef = useRef();
  useHelper(lightRef, DirectionalLightHelper, 5);

  return (
    <mesh
      scale={[0.1, 0.1, 0.1]}
      position={[0, 2, 0]}
      onClick={(event) => {
        setTargetToTransform(event.object);
        setTargetLight(event.object.children[0]);
        setIntensity(event.object.children[0].intensity);
        handleLightClick(props.type);
      }}
      onPointerMissed={() => handleWindowClose(props.type)}
    >
      <sphereBufferGeometry attach='geometry' />
      <meshLambertMaterial attach='material' color='white' />
      <directionalLight {...props.positions} color='white' ref={lightRef} />
    </mesh>
  );
};

export const PointLight = (props) => {
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  const setTargetToTransform = useTransform(
    (state) => state.setTargetToTransform
  );
  const setTargetLight = useLight((state) => state.setTargetLight);
  const setIntensity = useLight((state) => state.setIntensity);

  const lightRef = useRef();
  useHelper(lightRef, PointLightHelper, 5);

  return (
    <mesh
      scale={[0.1, 0.1, 0.1]}
      position={[0, 2, 0]}
      onClick={(event) => {
        setTargetToTransform(event.object);
        setTargetLight(event.object.children[0]);
        setIntensity(event.object.children[0].intensity);
        handleLightClick(props.type);
      }}
      onPointerMissed={() => handleWindowClose(props.type)}
    >
      <sphereBufferGeometry attach='geometry' />
      <meshLambertMaterial attach='material' color='white' />
      <pointLight {...props.positions} color='white' ref={lightRef} />
    </mesh>
  );
};
