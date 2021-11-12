import React, { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper, PointLightHelper } from 'three';
import { useLight, useColor, useTarget } from './context';
import { convertColor } from './color-converter';

export const AmbientLight = (props) => {
  // Use the functions defined in LightRenderer
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  const { setIntensity } = useLight();
  const { setCurrentColor } = useColor();
  const { setTargetMesh } = useTarget();

  const handleClick = (mesh) => {
    setTargetMesh(mesh);
    setIntensity(mesh.children[0].intensity);
    setCurrentColor(convertColor(mesh.children[0].color));
    handleLightClick(props.type);
  };

  return (
    <mesh
      scale={[0.1, 0.1, 0.1]}
      position={[0, 2, 0]}
      onClick={(event) => handleClick(event.object)} /// event.object is the mesh object that holds the light object
      onPointerMissed={() => handleWindowClose(props.type)}
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

  const { setIntensity } = useLight();
  const { setCurrentColor } = useColor();
  const { setTargetMesh } = useTarget();

  // The outline that accompanies the light to show direction
  const lightRef = useRef();
  useHelper(lightRef, DirectionalLightHelper, 5);

  const handleClick = (mesh) => {
    setTargetMesh(mesh);
    setIntensity(mesh.children[0].intensity);
    setCurrentColor(convertColor(mesh.children[0].color));
    handleLightClick(props.type);
  };

  return (
    <mesh
      scale={[0.07, 0.07, 0.07]}
      position={[0, 2, 0]}
      onClick={(event) => handleClick(event.object)} // event.object is the mesh object that holds the light object
      onPointerMissed={() => handleWindowClose(props.type)}
    >
      <icosahedronBufferGeometry attach='geometry' />
      <meshBasicMaterial attach='material' color='hotpink' wireframe />
      <directionalLight {...props.position} color='white' ref={lightRef} />
    </mesh>
  );
};

export const PointLight = (props) => {
  const handleLightClick = props.onClick;
  const handleWindowClose = props.onClose;

  const { setIntensity } = useLight();
  const { setCurrentColor } = useColor();
  const { setTargetMesh } = useTarget();

  // The outline that accompanies the light to show direction
  const lightRef = useRef();
  useHelper(lightRef, PointLightHelper, 5);

  const handleClick = (mesh) => {
    setTargetMesh(mesh);
    setIntensity(mesh.children[0].intensity);
    setCurrentColor(convertColor(mesh.children[0].color));
    handleLightClick(props.type);
  };

  return (
    <mesh
      scale={[0.07, 0.07, 0.07]}
      position={[0, 2, 0]}
      onClick={(event) => handleClick(event.object)} // event.object is the mesh object that holds the light object
      onPointerMissed={() => handleWindowClose(props.type)}
    >
      <icosahedronBufferGeometry attach='geometry' />
      <meshBasicMaterial attach='material' color='hotpink' wireframe />
      <pointLight {...props.position} color='white' ref={lightRef} />
    </mesh>
  );
};
