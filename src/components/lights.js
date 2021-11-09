import React, { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper, PointLightHelper } from 'three';
import { useTransform, useLight } from './context';

export const AmbientLight = (props) => {
  // Use the functions defined in LightRenderer
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  const { setTargetLight, setIntensity } = useLight();

  // When the light is clicked, setTargetLight to select light to change its properties, such as its intensity. Also, setIntensity
  // of the currently selected light so that the light window can properly display its intensity. Then, handleLightClick
  // of the type so that the light window can properly display the current type. Close the light window if we click anywhere but the light
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
      <ambientLight {...props.position} color='white' />
    </mesh>
  );
};

export const DirectionalLight = (props) => {
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  const { setTargetLight, setIntensity } = useLight();
  const { setTargetToTransform } = useTransform();

  // The white outline that accompanies the light to show direction
  const lightRef = useRef();
  useHelper(lightRef, DirectionalLightHelper, 5);

  // Since the directional light and the point light comes with a small ball for selection, setTargetToTransform to
  // select the light to allow for movement
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
      <directionalLight {...props.position} color='white' ref={lightRef} />
    </mesh>
  );
};

export const PointLight = (props) => {
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  const { setTargetLight, setIntensity } = useLight();
  const { setTargetToTransform } = useTransform();

  // The white outline that accompanies the light to show direction
  const lightRef = useRef();
  useHelper(lightRef, PointLightHelper, 5);

  // Since the directional light and the point light comes with a small ball for selection, setTargetToTransform to
  // select the light to allow for movement
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
      <pointLight {...props.position} color='white' ref={lightRef} />
    </mesh>
  );
};
