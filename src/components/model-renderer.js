import React, { useRef } from 'react';
import { useGroup, useModel, useProperty, useTarget } from './context';
import { convertColor } from './color-converter';

export default function ModelRenderer(props) {
  const meshRef = useRef();
  const { setTargetMesh } = useTarget();
  const { setCurrentColor, setCurrentTransform } = useProperty();
  const { setIsModelWindowOpen } = useModel();
  const { groupList } = useGroup();

  const meshIndex = useRef(`${groupList.filter((mesh) => !mesh.children[0]).length + 1}`);

  const handleClick = (mesh) => {
    setTargetMesh(mesh);
    setCurrentColor(convertColor(mesh.material.color));
    setCurrentTransform({
      translate: mesh.position,
      rotate: mesh.rotation.toVector3(),
      scale: mesh.scale,
    });
    setIsModelWindowOpen(true);
  };

  return (
    <>
      <mesh
        {...props.attributes}
        ref={meshRef}
        name={`Model ${meshIndex.current}`}
        onClick={(event) => handleClick(event.object)}
        onPointerMissed={() => setIsModelWindowOpen(false)}
        castShadow
      >
        {props.type === 'complex' ? {...props.geometry} : null}
        <meshStandardMaterial
          attach='material'
          color={props.attributes.color}
        />
      </mesh>
    </>
  );
}
