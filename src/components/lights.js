import React, { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper, PointLightHelper } from 'three';
import { useTransform, useLight } from './context';

export const AmbientLight = (props) => {
  // Use the functions defined in LightRenderer
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  const { setTargetLight, setIntensity } = useLight();

  const handleClick = (light) => {
    setTargetLight(light);
    setIntensity(light.intensity);
    handleLightClick(props.type);
  };

  return (
    <mesh
      scale={[0.1, 0.1, 0.1]}
      position={[0, 2, 0]}
      onClick={(event) => handleClick(event.object.children[0])} // event.object.children[0] is the light object
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

  const handleClick = (mesh) => {
    setTargetToTransform(mesh);
    setTargetLight(mesh.children[0]);
    setIntensity(mesh.children[0].intensity);
    handleLightClick(props.type);
  };

  return (
    <mesh
      scale={[0.1, 0.1, 0.1]}
      position={[0, 2, 0]}
      onClick={(event) => handleClick(event.object)} // event.object is the mesh object that holds the light object
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

  const handleClick = (mesh) => {
    setTargetToTransform(mesh);
    setTargetLight(mesh.children[0]);
    setIntensity(mesh.children[0].intensity);
    handleLightClick(props.type);
  };

  return (
    <mesh
      scale={[0.1, 0.1, 0.1]}
      position={[0, 2, 0]}
      onClick={(event) => handleClick(event.object)} // event.object is the mesh object that holds the light object
      onPointerMissed={() => handleWindowClose(props.type)}
    >
      <sphereBufferGeometry attach='geometry' />
      <meshLambertMaterial attach='material' color='white' />
      <pointLight {...props.position} color='white' ref={lightRef} />
    </mesh>
  );
};
