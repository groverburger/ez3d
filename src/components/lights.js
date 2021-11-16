import React, { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper, PointLightHelper } from 'three';
import { useProperty, useTarget } from './context';
import { convertColor } from './color-converter';

export const AmbientLight = (props) => {
  // Use the functions defined in LightRenderer
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  const { setCurrentColor, setCurrentIntensity, setCurrentTransform } = useProperty();
  const { setTargetMesh } = useTarget();

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
      scale={[0.1, 0.1, 0.1]}
      position={[0, 1.55, 0]}
      onClick={(event) => handleClick(event.object)} /// event.object is the mesh object that holds the light object
      onPointerMissed={() => handleWindowClose()}
    >
      <icosahedronBufferGeometry attach='geometry' />
      <meshBasicMaterial attach='material' color='hotpink' wireframe />
      <ambientLight {...props.position} color='white' />
    </mesh>
  );
};

export const DirectionalLight = (props) => {
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  const { setCurrentColor, setCurrentIntensity, setCurrentTransform } = useProperty();
  const { setTargetMesh } = useTarget();

  // The outline that accompanies the light to show direction
  const lightRef = useRef();
  useHelper(lightRef, DirectionalLightHelper, 5);

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
      scale={[0.07, 0.07, 0.07]}
      position={[0, 1.55, 0]}
      onClick={(event) => handleClick(event.object)}
      onPointerMissed={() => handleWindowClose()}
    >
      <icosahedronBufferGeometry attach='geometry' />
      <meshBasicMaterial attach='material' color='hotpink' wireframe />
      <directionalLight
        {...props.position}
        ref={lightRef}
        color='white'
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        castShadow
      />
    </mesh>
  );
};

export const PointLight = (props) => {
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  const { setCurrentColor, setCurrentIntensity, setCurrentTransform } = useProperty();
  const { setTargetMesh } = useTarget();

  // The outline that accompanies the light to show direction
  const lightRef = useRef();
  useHelper(lightRef, PointLightHelper, 5);

  const handleClick = (mesh) => {
    setTargetMesh(mesh);
    setCurrentIntensity(mesh.children[0].intensity);
    setCurrentColor(convertColor(mesh.children[0].color));
    setCurrentTransform({
      translate: mesh.position,
      rotate: mesh.rotation,
      scale: mesh.scale,
    });
    handleLightClick(props.type);
  };

  return (
    <mesh
      scale={[0.07, 0.07, 0.07]}
      position={[0, 1.55, 0]}
      onClick={(event) => handleClick(event.object)}
      onPointerMissed={() => handleWindowClose()}
    >
      <icosahedronBufferGeometry attach='geometry' />
      <meshBasicMaterial attach='material' color='hotpink' wireframe />
      <pointLight
        {...props.position}
        ref={lightRef}
        color='white'
        castShadow
      />
    </mesh>
  );
};
