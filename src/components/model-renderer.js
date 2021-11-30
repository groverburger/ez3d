import React, { useRef, useEffect } from 'react';
import { useGroup, useModel, useProperty, useTarget } from './context.js';
import { convertColor } from './color-converter.js';

export default function ModelRenderer(props) {
  const meshRef = useRef();
  const { setTargetMesh } = useTarget();
  const { setCurrentColor, setCurrentTransform } = useProperty();
  const { setIsModelWindowOpen } = useModel();
  const { groupList } = useGroup();

  const meshIndex = useRef(`${groupList.filter((mesh) => !mesh.children[0]).length + 1}`);

  // create the mesh element up here
  // so we can mess with it before we render it
  const meshElement = <mesh
    uuid={props.uuid}
    ref={meshRef}
    name={`Model ${meshIndex.current}`}
    onClick={handleClick}
    onPointerMissed={() => setIsModelWindowOpen(false)}
    castShadow
  >
    {(() => {
      switch (props.geometryType) {
        case "BoxGeometry":
          return <boxBufferGeometry attach="geometry" />
        case "SphereGeometry":
          return <sphereBufferGeometry attach="geometry" />
        case "CylinderGeometry":
          return <cylinderBufferGeometry attach="geometry" />
        case "ConeGeometry":
          return <coneBufferGeometry attach="geometry" />
        case "TorusGeometry":
          return <torusBufferGeometry attach="geometry" />
        case "TetrahedronGeometry":
          return <tetrahedronBufferGeometry attach="geometry" />
        case "IcosahedronGeometry":
          return <icosahedronBufferGeometry attach="geometry" />
        case "OctahedronGeometry":
          return <octahedronBufferGeometry attach="geometry" />
        case "DodecahedronGeometry":
          return <dodecahedronBufferGeometry attach="geometry" />
      }
    })()}
    <meshStandardMaterial attach="material" color={props.color}
    />
  </mesh>

  function handleClick(event) {
    const mesh = event.object
    setTargetMesh(mesh);
    setCurrentColor(convertColor(mesh.material.color));
    setCurrentTransform({
      translate: mesh.position,
      rotate: mesh.rotation.toVector3(),
      scale: mesh.scale,
    });
    setIsModelWindowOpen(true);
  };

  // when the mesh is first rendered, set its values to the given initial properties
  // this is used for state deserialization (aka loading)
  useEffect(() => {
    const mesh = meshElement.ref.current

    if (props.position) {
      mesh.position.x = props.position.x
      mesh.position.y = props.position.y
      mesh.position.z = props.position.z
    }

    if (props.rotation) {
      mesh.rotation.x = props.rotation.x
      mesh.rotation.y = props.rotation.y
      mesh.rotation.z = props.rotation.z
    }

    if (props.scale) {
      mesh.scale.x = props.scale.x
      mesh.scale.y = props.scale.y
      mesh.scale.z = props.scale.z
    }

    if (props.color && typeof(props.color) == "object") {
      mesh.material.color = props.color
    }

    console.log(mesh)
  }, [])

  return meshElement
}
