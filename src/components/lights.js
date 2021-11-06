import React, { useContext, useEffect, useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper, PointLightHelper } from 'three';
import { RangeContext, LightContext, useStore } from './context';

export const AmbientLight = (props) => {
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  const rangeValue = useContext(RangeContext);
  const [range, setRange] = rangeValue;

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

  const setTarget = useStore((state) => state.setTarget);

  const rangeValue = useContext(RangeContext);
  const [range, setRange] = rangeValue;

  const lightRef = useRef();
  useHelper(lightRef, DirectionalLightHelper, 5);

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
      onClick={(event) => {
        setTarget(event.object);
        handleLightClick(props.type);
      }}
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
  );
};

export const PointLight = (props) => {
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  const setTarget = useStore((state) => state.setTarget);

  const rangeValue = useContext(RangeContext);
  const [range, setRange] = rangeValue;

  const lightRef = useRef();
  useHelper(lightRef, PointLightHelper, 5);

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
      onClick={(event) => {
        setTarget(event.object);
        handleLightClick(props.type);
      }}
      onPointerMissed={() => handleWindowClose(props.type)}
    >
      <sphereBufferGeometry attach='geometry' />
      <meshLambertMaterial attach='material' {...props.properties.color} />
      <pointLight {...props.properties} position={[0, 0, 0]} ref={lightRef} />
    </mesh>
  );
};
