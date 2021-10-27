import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import './styles.css'
import SplitPane from "react-split-pane/lib/SplitPane";
import Pane from "react-split-pane/lib/Pane";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";

/**
 * Basic implementation to creating a Box element.
 */
function Box() {
  return(
    <mesh>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  )
}

function App() {
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
                  <NavDropdown.Item href="#action/3.1">Cube</NavDropdown.Item>{/*Button that will add Cube mesh to scene*/}
                  <NavDropdown.Item href="#action/3.2">Sphere</NavDropdown.Item>{/*Button that will add Sphere mesh to scene*/}
                  <NavDropdown.Item href="#action/3.3">Cylinder</NavDropdown.Item>{/*Button that will add Cylinder mesh to scene*/}

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
            <Box/>
          </Canvas>
        </Pane>

        {/*right pane with pixel limits(initialSize, minSize, maxSize)*/}
        <Pane initialSize="350px" minSize="250px" maxSize="350px">
        This is the outliner
=======

        {/* The outliner menu */}
        <Pane
          className='pane-outliner'
          initialSize='350px'
          minSize='250px'
          maxSize='350px'
        >
          <SplitPane className='splitpane' split='horizontal'>
            <Pane
              className='pane-outliner'
              initialSize='350px'
              minSize='250px'
            >

            </Pane>
            <Pane>
              <GridContext.Provider value={[grid, setGrid]}>
                <Outliner />
              </GridContext.Provider>
            </Pane>
          </SplitPane>

        </Pane>
      </SplitPane>

    </>
  );
}

export default App;
