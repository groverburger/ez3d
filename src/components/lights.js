import React, { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper, PointLightHelper } from 'three';

export function AmbientLight(props) {
  // Use the functions defined in LightRenderer
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  // Make a copy of the properties in the light list so that we can delete the type property.
  // This is done because we can't pass the object as a position prop if there are more than one properties
  const propsCopy = Object.assign({}, props);
  delete propsCopy.type;

  // When the light is clicked, set the selected light to the light object to change its properties, such as its intensity. Also, set intensity
  // of the currently selected light so that the light window can properly display its intensity. Then, handleLightClick
  // of the type so that the light window can properly display the current type. Close the light window if we click anywhere but the light
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
