import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import './styles.css'

/**
 * Basic implementation to creating a Box element.
 */
function Box() {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  )
}

/**
 * Create a Canvas to render elements into the scene.
 * 
 * OrbitControls    Allows the camera to move around a target
 * ambientLight     Lighting for all objects in the scene
 * spotLight        Lighting in one direction in a cone
 * gridHelper       Creates a grid
 * - args           [X-Dimension, Y-Dimension, Middle Grid Color, General Grid Color]
 * fog              Adds fog into the scene
 * - args           [Color, Minimum Distance, Maximum Distance]
 * Box              Includes the Box element into the scene
 */
export default function App() {
  return (
    <Canvas camera={{ position: [3, 3, 3] }}>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <spotLight position={[0, 5, 10]} angle={0.3}/>
      <gridHelper position={[0, -0.51, 0]} args={[100, 100, "#787878", "#989898"]}/>
      <fog attach="fog" args={["#d9d9db", 10, 20]} />
      <Box />
    </Canvas>
  )
}

// import React, { useRef, useState } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'
// import { OrbitControls } from 'drei'

// function Box(props) {
//   // This reference will give us direct access to the mesh
//   const ref = useRef()
//   // Set up state for the hovered and active state
//   const [hovered, setHover] = useState(false)
//   const [active, setActive] = useState(false)
//   // Rotate mesh every frame, this is outside of React without overhead
//   useFrame(() => {
//     ref.current.rotation.x = ref.current.rotation.y += 0.01
//   })
//   return (
//     <mesh
//       {...props}
//       ref={ref}
//       scale={active ? 1.5 : 1}
//       onClick={(e) => setActive(!active)}
//       onPointerOver={(e) => setHover(true)}
//       onPointerOut={(e) => setHover(false)}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
//     </mesh>
//   )
// }

// export default function App() {
//   return (
//     <Canvas>
//       <ambientLight intensity={0.5} />
//       <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
//       <pointLight position={[-10, -10, -10]} />
//       <Box position={[-1.2, 0, 0]} />
//       <Box position={[1.2, 0, 0]} />
//     </Canvas>
//   )
// }
