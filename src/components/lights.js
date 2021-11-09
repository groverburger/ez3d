import React, { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper, PointLightHelper } from 'three';

export function AmbientLight(props) {
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  const propsCopy = Object.assign({}, props);
  delete propsCopy.type;

  return (
    <mesh
      scale={[0.1, 0.1, 0.1]}
      position={[0, 2, 0]}
      onClick={(event) => {
        props.owner.state.lights.selected = event.object.children[0];
        props.owner.state.lights.intensity = event.object.children[0].intensity;
        props.owner.forceUpdate();
        handleLightClick(props.type);
      }}
      onPointerMissed={() => handleWindowClose(props.type)}
    >
      <sphereBufferGeometry attach='geometry' />
      <meshLambertMaterial attach='material' color='white' />
      <ambientLight {...propsCopy} color='white' />
    </mesh>
  );
}

export function DirectionalLight(props) {
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  const lightRef = useRef();
  useHelper(lightRef, DirectionalLightHelper, 5);

  const propsCopy = Object.assign({}, props);
  delete propsCopy.type;

  return (
    <mesh
      scale={[0.1, 0.1, 0.1]}
      position={[0, 2, 0]}
      onClick={(event) => {
        props.owner.state.selected = event.object;
        props.owner.state.lights.selected = event.object.children[0];
        props.owner.state.lights.intensity = event.object.children[0].intensity;
        props.owner.forceUpdate();
        handleLightClick(props.type);
      }}
      onPointerMissed={() => handleWindowClose(props.type)}
    >
      <sphereBufferGeometry attach='geometry' />
      <meshLambertMaterial attach='material' color='white' />
      <directionalLight {...propsCopy} color='white' ref={lightRef} />
    </mesh>
  );
}

export function PointLight(props) {
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  const lightRef = useRef();
  useHelper(lightRef, PointLightHelper, 5);

  const propsCopy = Object.assign({}, props);
  delete propsCopy.type;

  return (
    <mesh
      scale={[0.1, 0.1, 0.1]}
      position={[0, 2, 0]}
      onClick={(event) => {
        props.owner.state.selected = event.object;
        props.owner.state.lights.selected = event.object.children[0];
        props.owner.state.lights.intensity = event.object.children[0].intensity;
        props.owner.forceUpdate();
        handleLightClick(props.type);
      }}
      onPointerMissed={() => handleWindowClose(props.type)}
    >
      <sphereBufferGeometry attach='geometry' />
      <meshLambertMaterial attach='material' color='white' />
      <pointLight {...propsCopy} color='white' ref={lightRef} />
    </mesh>
  );
}
