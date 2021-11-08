import React from 'react';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export default function ModelRenderer(props) {
  const verts = []
  for (let i=0; i<props.vertices.length; i+=3) {
    const vert = [props.vertices[i], props.vertices[i+1], props.vertices[i+2]]
    verts.push(vert)
  }

  let iter = 0
  console.log(props.owner.state.camera)
  return (
    <>
      <mesh {...props} onClick={event => props.owner.setState({selectedModel: event.object})}/>
      {
        verts.map(vert => {
          iter += 1 // keep the iteration so that each point has its own unique key
          return (
            <Sphere key={iter} position={[vert[0], vert[1], vert[2]]} scale={0.1} onClick={event => console.log(event)}>
              <meshBasicMaterial attach="material" color="hotpink" />
            </Sphere>
          )
        })
      }
    </>
  )
}
