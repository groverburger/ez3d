import React, { useRef, useState } from 'react'
import { Canvas} from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import './styles.css'
import SplitPane from "react-split-pane/lib/SplitPane";
import Pane from "react-split-pane/lib/Pane";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";

// edited by Ruiyang
// create a box on origin
// reference: https://codesandbox.io/s/r3f-basic-demo-forked-6q6ww?file=/src/App.js:600-604
function Box(props) {
  const mesh = useRef()
   return (
    <mesh {...props} ref={mesh}>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  )
}

//Edited by Gabi with Ruiyang's code above as reference
//create a cylinder
//set color to green
function Cylinder(props) {
  const mesh = useRef()
   return (
    <mesh {...props} ref={mesh}>
      <cylinderBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="green" />
    </mesh>
  )
}

//Edited by Gabi with Ruiyang's code above as reference
//create a sphere
//set color to blue
function Sphere(props) {
  const mesh = useRef()
   return (
    <mesh {...props} ref={mesh}>
      <sphereBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="blue" />
    </mesh>
  )
}

function App() {
  const [boxes, setBoxes] = useState([])
  const [cylinders, setCylinders] = useState([])
  const [spheres, setSpheres] = useState([])

  return (
    < >
      {/* Navigation bar with file, edit, add, etc.
          reference: https://react-bootstrap.github.io/components/navbar/
      */}
      <nav>
        {/*
          bg= light (light theme... there is also a dark theme)
          expand = small(how far the window closes until menu icon)
          fixed = top (fixed navbar along the top of the screen, scrolls with page)
        */}
        <Navbar bg="light" expand="sm" fixed="top">
            {/*
              Brand = Title of the website.
              It also has a link attached to it if user clicks on the EZ-3D
            */}
            <Navbar.Brand href="#home">EZ-3D</Navbar.Brand>
            {/*Toggle and Collapse Components control when content collapses behind buttons*/}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                {/*link attached to File*/}
                <Nav.Link href="#home">File</Nav.Link>
                {/*link attached to Edit*/}
                <Nav.Link href="#link">Edit</Nav.Link>
                {/*Dropdown menu where you can add meshes and lights*/}
                <NavDropdown title="Add" id="responsive-nav-dropdown">
                  <NavDropdown.ItemText>Meshes</NavDropdown.ItemText>{/*Non-clickable text*/}
                  <NavDropdown.Divider /> {/*Seperator line in dropdown*/}
                  <NavDropdown.Item href="#action/3.1" onClick={() => generateNewBlock()}>Cube</NavDropdown.Item>{/*Button that will add Cube mesh to scene*/}
                  <NavDropdown.Item href="#action/3.2" onClick={() => generateNewSphere()}>Sphere</NavDropdown.Item>{/*Button that will add Sphere mesh to scene*/}
                  <NavDropdown.Item href="#action/3.3" onClick={() => generateNewCylinder()}>Cylinder</NavDropdown.Item>{/*Button that will add Cylinder mesh to scene*/}

                  <NavDropdown.Divider />{/*Seperator line in dropdown*/}
                  <NavDropdown.ItemText>Lights</NavDropdown.ItemText>{/*Non-clickable text*/}
                  <NavDropdown.Divider />{/*Seperator line in dropdown*/}
                  <NavDropdown.Item href="#action/3.4">Point</NavDropdown.Item>{/*Button that will add point light to scene*/}
                  <NavDropdown.Item href="#action/3.5">Direction</NavDropdown.Item>{/*Button that will add direction light to scene*/}
                  <NavDropdown.Item href="#action/3.6">Ambient</NavDropdown.Item>{/*Button that will add Ambient light to scene*/}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
      </nav>
      {/* Vertical Splitpane = left side is viewport, right panel is the outliner
          reference: https://www.npmjs.com/package/react-split-pane
      */}
      <SplitPane split="vertical">{/*split can be horizontal or vertical*/}
        <Pane> {/*left pane*/}
        {/**
         * Create a Canvas to render elements into the scene
         * OrbitControls    Allows the camera to move around a target
         * ambientLight     Lighting for all objects in the scene
         * spotLight        Lighting in one direction in a cone
         * gridHelper       Creates a grid
         * - args           [X-Dimension, Y-Dimension, Middle Grid Color, General Grid Color]
         * fog              Adds fog into the scene
         * - args           [Color, Minimum Distance, Maximum Distance]
         * Box              Includes the Box element into the scene
         */}
          <Canvas camera={{ position: [3, 3, 3] }}>
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <spotLight position={[0, 5, 10]} angle={0.3}/>
            <gridHelper position={[0, -0.51, 0]} args={[100, 100, "#787878", "#989898"]}/>
            <fog attach="fog" args={["#d9d9db", 10, 20]} />
            {boxes.map((props) => (
            <Box {...props} />
            ))}
            {cylinders.map((props) => (
            <Cylinder {...props} />
            ))}
            {spheres.map((props) => (
            <Sphere {...props} />
            ))}
          </Canvas>
        </Pane>
        {/*right pane with pixel limits(initialSize, minSize, maxSize)*/}
        <Pane initialSize="350px" minSize="250px" maxSize="350px">
        This is the outliner
        </Pane>
      </SplitPane>
    </>
  );

  // edited by Ruiyang
  function generateNewBlock() {
    const total = boxes.length
    let newBoxes = boxes
    newBoxes.push({position: [0, 0 , 0]})
    console.log(total)
    setBoxes([...newBoxes])
  }

//edited by Gabi
//cylinder creation function
  function generateNewCylinder() {

    //total = number of cylinders
    const total = cylinders.length
    let newCylinders = cylinders

    //push a new cylinder onto the list in center of scene
    newCylinders.push({position: [0, 0, 0]})
    console.log(total)
    setCylinders([...newCylinders])
  }

  //edited by Gabi
  //sphere creation function
    function generateNewSphere() {

      //total = number of spheres
      const total = cylinders.length
      let newSpheres = spheres

      //push a new cylinder onto the list in center of scene
      newSpheres.push({position: [0, 0, 0]})
      console.log(total)
      setSpheres([...newSpheres])
    }

}

export default App;
