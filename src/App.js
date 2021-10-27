import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TransformControls } from '@react-three/drei';
import { Controls, useControl } from 'react-three-gui';
import { Navbar, Nav } from 'react-bootstrap';
import { ShapeContext, GridContext } from './components/context';

import SplitPane from 'react-split-pane/lib/SplitPane';
import Pane from 'react-split-pane/lib/Pane';
import NavFile from './components/nav-file';
import NavEdit from './components/nav-edit';
import NavAdd from './components/nav-add';
import Outliner from './components/outliner';

import './App.css';
import './components/navbar.css';

/**
 * Edited by Ruiyang
 * Create a box on origin.
 * Reference: https://codesandbox.io/s/r3f-basic-demo-forked-6q6ww?file=/src/App.js:600-604
 *
 * Edited by Eric
 * Transform controls.
 * Reference: https://codesandbox.io/s/react-three-fiber-gestures-hc8gm?file=/src/index.js
 *
 * BUG!
 * Orbit is native to each object (they can stack on each other,
 * making OrbitControls more and more sensitive)
 */
function Box(props) {
  const orbit = useRef();
  const transform = useRef();
  const mode = useControl('mode', {
    type: 'select',
    items: ['scale', 'rotate', 'translate'],
  });

  const mesh = useRef();

  // The effect that allows the user to access the transform interface
  useEffect(() => {
    if (transform.current) {
      const controls = transform.current;
      controls.setMode(mode);
      const callback = (event) => (orbit.current.enabled = !event.value);
      controls.addEventListener('dragging-changed', callback);
      return () => controls.removeEventListener('dragging-changed', callback);
    }
  });
  return (
    <>
      <TransformControls ref={transform}>
        <mesh {...props} ref={mesh}>
          <boxBufferGeometry attach='geometry' />
          <meshLambertMaterial attach='material' color='hotpink' />
        </mesh>
      </TransformControls>
      <OrbitControls ref={orbit} />
    </>
  );
}

/**
 * Edited by Gabi (using Ruiyang's code above as reference)
 * Create a cylinder on origin.
 *
 * Edited by Eric
 * Transform controls.
 * Reference: https://codesandbox.io/s/react-three-fiber-gestures-hc8gm?file=/src/index.js
 */
function Cylinder(props) {
  const orbit = useRef();
  const transform = useRef();
  const mode = useControl('mode', {
    type: 'select',
    items: ['scale', 'rotate', 'translate'],
  });

  const mesh = useRef();

  useEffect(() => {
    if (transform.current) {
      const controls = transform.current;
      controls.setMode(mode);
      const callback = (event) => (orbit.current.enabled = !event.value);
      controls.addEventListener('dragging-changed', callback);
      return () => controls.removeEventListener('dragging-changed', callback);
    }
  });
  return (
    <>
      <TransformControls ref={transform}>
        <mesh {...props} ref={mesh}>
          <cylinderBufferGeometry attach='geometry' />
          <meshLambertMaterial attach='material' color='green' />
        </mesh>
      </TransformControls>
      <OrbitControls ref={orbit} />
    </>
  );
}

/**
 * Edited by Gabi (using Ruiyang's code above as reference)
 * Create a sphere on origin.
 *
 * Edited by Eric
 * Transform controls.
 * Reference: https://codesandbox.io/s/react-three-fiber-gestures-hc8gm?file=/src/index.js
 */
function Sphere(props) {
  const orbit = useRef();
  const transform = useRef();
  const mode = useControl('mode', {
    type: 'select',
    items: ['scale', 'rotate', 'translate'],
  });

  const mesh = useRef();

  useEffect(() => {
    if (transform.current) {
      const controls = transform.current;
      controls.setMode(mode);
      const callback = (event) => (orbit.current.enabled = !event.value);
      controls.addEventListener('dragging-changed', callback);
      return () => controls.removeEventListener('dragging-changed', callback);
    }
  });
  return (
    <>
      <TransformControls ref={transform}>
        <mesh {...props} ref={mesh}>
          <sphereBufferGeometry attach='geometry' />
          <meshLambertMaterial attach='material' color='blue' />
        </mesh>
      </TransformControls>
      <OrbitControls ref={orbit} />
    </>
  );
}

/**
 * Contains the Canvas, the Navbar, and the Panes.
 * Reference: https://stackoverflow.com/questions/66727049/exporting-a-state-from-hook-function-to-another-component
 *            https://tyrannosaurustech.com/blog/global-state-management-with-react-hooks-and-context/
 *            https://stackoverflow.com/questions/58451029/usestate-object-set
 *            https://stackoverflow.com/questions/60305746/how-do-i-update-an-object-state-in-react-via-hooks
 *
 * ShapeContext.Provider    All components under this component can receive and respond to
 *                          the global state value that is set in the 'value' parameter.
 *                          This particular provider saves the state of the shapes needed
 *                          to be generated.
 *
 * grid, setGrid            A hook that saves the on or off state of the switch. The grid
 *                          parameter is a variable that holds the current state. Its default
 *                          is true. The setGrid parameter is a function that changes the
 *                          state of grid.
 *
 * shapes, setShapes        A hook that determines the number of shapes we should generate.
 *                          The shapes parameter is an object that contains the arrays for
 *                          each shape. The setShapes parameter is a function that adds
 *                          another shape to the relevant arrays. Basically, instead of
 *                          having three different arrays for the shapes, we can instead
 *                          have one object in which we can call upon to get the relevant
 *                          array.
 */
export default function App() {
  const [grid, setGrid] = useState(true);
  const [shapes, setShapes] = useState({
    boxes: [],
    cylinders: [],
    spheres: [],
  });

  return (
    <>
      {/* The control menu for the shapes */}
      <Controls />

      {/* Navigation bar with file, edit, add, etc.
          Reference: https://react-bootstrap.github.io/components/navbar/

          Navbar          bg = light (light theme... there is also a dark theme)
                          expand = small (how far the window closes until menu icon)
                          fixed = top (fixed navbar along the top of the screen, scrolls with page)

          Navbar.Brand    Title of the website. It also has a link attached
                          to it if user clicks on the EZ-3D.

          NavFile         Contains the relevant code for the File dropdown.
          NavEdit         Contains the relevant code for the Edit dropdown.
          NavAdd          Contains the relevant code for the Add dropdown.
      */}
      <ShapeContext.Provider value={[shapes, setShapes]}>
        <Navbar className='navbar'>
          <Navbar.Brand className='brand' href='/'>
            EZ-3D
          </Navbar.Brand>
          <Nav className='me-auto'>
            <NavFile />
            <NavEdit />
            <NavAdd />
          </Nav>
        </Navbar>
      </ShapeContext.Provider>

      {/* Splits the window into two. The left side is
          the viewport and the right side is the outliner.
          Reference: https://www.npmjs.com/package/react-split-pane

          SplitPane       split = vertical (split window vertically)

          Pane            The split windows.
                          initialSize = limits (initialSize, minSize, maxSize)
      */}
      <SplitPane className='splitpane' split='vertical'>
        <Pane className='pane-canvas'>
          <Canvas camera={{ position: [3, 3, 3] }}>
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <spotLight position={[0, 5, 10]} angle={0.3} />
            <fog attach='fog' args={['#e6e6e9', 10, 40]} />

            {/* Anything put into the array will be added onto the
                canvas. The arrays are inside an object. To access
                the array, use {obj}.{shape} where obj is the name
                of the object and shape is the name of the array in
                the object. In this case, shapes is the name of the
                object and its parameters are boxes, cylinders, and
                spheres. If we wanted to access the array for the
                boxes, we would use shapes.boxes.
            */}
            {shapes.boxes.map((props) => (
              <Box key='{props}' {...props} />
            ))}

            {shapes.cylinders.map((props) => (
              <Cylinder key='{props}' {...props} />
            ))}

            {shapes.spheres.map((props) => (
              <Sphere key='{props}' {...props} />
            ))}

            {/* If grid is true, add the grid onto the canvas. Else,
                do not put anything into the canvas.
            */}
            {grid ? (
              <gridHelper
                position={[0, -0.51, 0]}
                args={[100, 100, '#89898e', '#adadb4']}
              />
            ) : null}
          </Canvas>
        </Pane>

        {/* The outliner menu(right pane) that will have a nested splitpane*/}
        <Pane
          className='pane-outliner'
          initialSize='350px'
          minSize='250px'
          maxSize='350px'
        >
          {/*  This will divide the List of assets in scene from the Other scene options */}
          <SplitPane className='splitpane' split='horizontal'>
            {/*Top Pane*/}
            <Pane
              className='pane-outliner'
              initialSize='350px'
              minSize='250px'
            >
            </Pane>
            {/*Bottom Pane*/}
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

// Here as a backup just in case the array in the objects is too complicated.
//
// import { BoxContext } from './context';
// const [boxes, setBoxes] = useState([]);
// <BoxContext.Provider value={[boxes, setBoxes]}></BoxContext.Provider>
// {boxes.map((props) => (<Box {...props} />))}
