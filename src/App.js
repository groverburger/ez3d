import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import './styles.css'
import Header from './components/header'
import { Context } from './components/context'

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
 * Create a hook that set state for the grid (on/off).
 * 
 * Context.Provider    All components under this component can receive and respond to
 *                     the global state value (true/false in this case).
 * Header              Adds a header.
 * OrbitControls       Allows the camera to move around a target
 * ambientLight        Lighting for all objects in the scene
 * spotLight           Lighting in one direction in a cone
 * Box                 Includes the Box element into the scene
 * fog                 Adds fog into the scene
 * - args              [Color, Minimum Distance, Maximum Distance]
 * gridHelper          If toggle is true, create grid - else, create nothing
 * - args              [X-Dimension, Y-Dimension, Middle Grid Color, General Grid Color]
 */
export default function App() {
  const [toggle, setToggle] = useState(true)
  return (
    <>
      <Context.Provider value={[toggle, setToggle]}>
        <Header />
      </Context.Provider>
      <Canvas camera={{ position: [3, 3, 3] }}>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 5, 10]} angle={0.3} />
        <Box />
        <fog attach="fog" args={["#d9d9db", 10, 20]} />
        {toggle ? <gridHelper position={[0, -0.51, 0]} args={[100, 100, "#787878", "#989898"]} /> : null}
      </Canvas>
    </>
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
