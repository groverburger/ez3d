import React, { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper, PointLightHelper } from 'three';
import { useTransform, useLight } from './context';

export const AmbientLight = (props) => {
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  const { setTargetLight, setIntensity } = useLight();

  const propsCopy = Object.assign({}, props);
  delete propsCopy.type;

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
      <ambientLight {...propsCopy} color='white' />
    </mesh>
  );
};

export const DirectionalLight = (props) => {
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  const { setTargetLight, setIntensity } = useLight();
  const { setTargetToTransform } = useTransform();

  const lightRef = useRef();
  useHelper(lightRef, DirectionalLightHelper, 5);

  const propsCopy = Object.assign({}, props);
  delete propsCopy.type;

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
      <directionalLight {...propsCopy} color='white' ref={lightRef} />
    </mesh>
  );
};

export const PointLight = (props) => {
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  const { setTargetLight, setIntensity } = useLight();
  const { setTargetToTransform } = useTransform();

  const lightRef = useRef();
  useHelper(lightRef, PointLightHelper, 5);

  const propsCopy = Object.assign({}, props);
  delete propsCopy.type;

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
      <pointLight {...propsCopy} color='white' ref={lightRef} />
    </mesh>
  );
};
