import React from 'react';
import { Sphere, Points, Point } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function ModelRenderer(props) {
  const selectModel = event => {
    props.owner.setState({selected: {
      object: event.object,
      uuid: props.uuid,
      type: "model",
    }})
  }

  return (
    <mesh {...props} onClick={selectModel}>
        <meshBasicMaterial attach="material" color="#4488ff"/>
    </mesh>
  )
}
