import React from 'react';
import { Sphere, Points, Point } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function ModelRenderer(props) {
  return (
    <mesh {...props} onClick={event => props.owner.setState({selected: event.object})}>
        <meshPhongMaterial attach="material" color="#4488ff"/>
    </mesh>
  )
}
