import React, { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper, PointLightHelper } from 'three';
import { useGroup, useProperty, useTarget } from './context.js';
import { convertColor } from './color-converter.js';

const LightMesh = ({ children, props }) => {
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  const { setCurrentColor, setCurrentIntensity, setCurrentTransform } = useProperty();
  const { setTargetMesh } = useTarget();
  const { groupList } = useGroup();

  const lightIndex = useRef(`${groupList.filter((mesh) => mesh.children[0]).length + 1}`);

  const handleClick = (mesh) => {
    setTargetMesh(mesh);
    setCurrentIntensity(mesh.children[0].intensity);
    setCurrentColor(convertColor(mesh.children[0].color));
    setCurrentTransform({
      translate: mesh.position,
      rotate: mesh.rotation.toVector3(),
      scale: mesh.scale,
    });
    handleLightClick(props.type);
  };

  return (
    <mesh
      name={`Light ${lightIndex.current}`}
      scale={[0.1, 0.1, 0.1]}
      position={[0, 1.55, 0]}
      onClick={(event) => handleClick(event.object)} /// event.object is the mesh object that holds the light object
      onPointerMissed={() => handleWindowClose()}
    >
      <icosahedronBufferGeometry attach='geometry' />
      { children }
    </mesh>
  );
}

export const AmbientLight = (props) => {
  return (
    <LightMesh props={props}>
      <meshBasicMaterial attach='material' color='hotpink' wireframe />
      <ambientLight
        {...[props.position.x, props.position.y, props.position.z]}
        color='white'
      />
    </LightMesh>
  );
};

export const DirectionalLight = (props) => {
  const lightRef = useRef();
  useHelper(lightRef, DirectionalLightHelper, 5);  // The outline that accompanies the light to show direction

  return (
    <LightMesh props={props}>
      <meshBasicMaterial attach='material' color='hotpink' wireframe />
      <directionalLight
        {...[props.position.x, props.position.y, props.position.z]}
        ref={lightRef}
        color='white'
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        castShadow
      />
    </LightMesh>
  );
};

export const PointLight = (props) => {
  const lightRef = useRef();
  useHelper(lightRef, PointLightHelper, 5); // The outline that accompanies the light to show direction

  return (
    <LightMesh props={props}>
      <meshBasicMaterial attach='material' color='hotpink' wireframe />
      <pointLight
        {...{position: props.position}}
        ref={lightRef}
        color='white'
        castShadow
      />
    </LightMesh>
  );
};
