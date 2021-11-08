import React from 'react';
import { Sphere, Points, Point } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function ModelRenderer(props) {
  // condense the vertices into a list of triplets for easy them to be easily translated into points
  const verts = []
  for (let i=0; i<props.vertices.length; i+=3) {
    const vert = [props.vertices[i], props.vertices[i+1], props.vertices[i+2]]
    verts.push(vert)
  }

  const selectModel = event => {
    props.owner.setState({selected: {
      object: event.object,
      uuid: props.uuid,
      type: "model",
    }})
  }

  let iter = 0
  return (
    <>
      <mesh {...props} onClick={selectModel}>
        {/* change the material used on the model based on whether it is selected or not */}
        {props.owner.state.selected?.uuid == props.uuid
          ? <meshBasicMaterial attach="material" color="#222" wireframe/>
          : <meshBasicMaterial attach="material" color="#4488ff"/>}
      </mesh>

      {/* if the model is selected, then draw its vertices using Points */}
      {props.owner.state.selected?.uuid == props.uuid &&
        <Points>
          <pointsMaterial size={0.1} color="black" />
          {
            verts.map(vert => {
              iter += 1 // keep the iteration so that each point has its own unique key
              return <Point key={iter} position={[vert[0], vert[1], vert[2]]} onClick={event => console.log(event)}/>
            })
          }
        </Points>
      }
    </>
  )
}
