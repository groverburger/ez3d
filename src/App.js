import React, { useState, useContext, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TransformControls } from '@react-three/drei';
import { Controls } from 'react-three-gui';
import { Navbar, Nav } from 'react-bootstrap';
import {
  ShapeContext,
  SelectedShapeContext,
  GridContext,
  TransformContext,
  TransformDragContext
} from './components/context';

import SplitPane from 'react-split-pane/lib/SplitPane';
import Pane from 'react-split-pane/lib/Pane';
import NavFile from './components/nav-file';
import NavEdit from './components/nav-edit';
import NavAdd from './components/nav-add';
import Outliner from './components/outliner';
import Toolbar from './components/toolbar';
import ModelRenderer from './components/modelRenderer';

import './App.css';
import './components/navbar.css';

/**
 * Contains the Canvas, the Navbar, and the Panes.
 * Reference: https://stackoverflow.com/questions/66727049/exporting-a-state-from-hook-function-to-another-component
 *            https://tyrannosaurustech.com/blog/global-state-management-with-react-hooks-and-context/
 *            https://stackoverflow.com/questions/58451029/usestate-object-set
 *            https://stackoverflow.com/questions/60305746/how-do-i-update-an-object-state-in-react-via-hooks
 *
 * grid, setGrid              A hook that saves the on or off state of the switch. The grid
 *                            parameter is a variable that holds the current state. Its default
 *                            is true. The setGrid parameter is a function that changes the
 *                            state of grid.
 * 
 * transform, setTransform    A hook that determines what transform control to use. The
 *                            transform parameter is a string of one of the transform control
 *                            modes: translate, scale, or rotate. The setTransform parameter
 *                            is a function that changes the mode of the transform control.
 *                            This hook is linked to the toolbar, therefore whatever button
 *                            is currently active, it will use setTransform to update the
 *                            transform parameter to have the currently selected mode's string.
 *
 * shapes, setShapes          A hook that determines the number of shapes we should generate.
 *                            The shapes parameter is an object that contains the arrays for
 *                            each shape. The setShapes parameter is a function that adds
 *                            another shape to the relevant arrays. Basically, instead of
 *                            having three different arrays for the shapes, we can instead
 *                            have one object in which we can call upon to get the relevant
 *                            array.
 */
export default function App() {
  const [grid, setGrid] = useState(true);
  const [transform, setTransform] = useState('');
  const [transformDrag, setTransformDrag] = useState(false); 
  const orbitControl = useRef();
  const [shapes, setShapes] = useState({models: []});
  const [selectedShapes, setSelectedShapes] = useState({models: []});

  return (
    <>
      {/* Control Menu for the Shapes */}
      <Controls />

      {/* Navigation bar with file, edit, add, etc.
        * Reference: https://react-bootstrap.github.io/components/navbar/
        *
        * ShapeContext.Provider    All components under this component can receive and respond to
        *                          the global state value that is set in the value parameter.
        *                          This particular provider saves the state of the shapes needed
        *                          to be generated.
        *
        * Navbar                   bg = light (light theme... there is also a dark theme)
        *                          expand = small (how far the window closes until menu icon)
        *                          fixed = top (fixed navbar along the top of the screen, scrolls with page)
        *
        * Navbar.Brand             Title of the website. It also has a link attached
        *                          to it if user clicks on the EZ-3D.
        *
        * NavFile                  Contains the relevant code for the File dropdown.
        * NavEdit                  Contains the relevant code for the Edit dropdown.
        * NavAdd                   Contains the relevant code for the Add dropdown.
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
        * the viewport and the right side is the outliner.
        * Reference: https://www.npmjs.com/package/react-split-pane
        *
        * SplitPane    split = vertical (split window vertically)
        *
        * Pane         The split windows.
        *              initialSize = limits (initialSize, minSize, maxSize)
        */}
      <SplitPane className='splitpane' split='vertical'>
        <Pane className='pane-canvas'>
          {/* Toolbar Menu for selecting transform controls. */}
          <TransformContext.Provider value={[transform, setTransform]}>
            <Toolbar />
          </TransformContext.Provider>

          <Canvas className='canvas' camera={{ position: [3, 3, 3] }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[0, 5, 10]} angle={0.3} />
            <fog attach='fog' args={['#dddde0', 10, 40]} />

            {/* Anything put into the array will be added onto the
              * canvas. The arrays are inside an object. To access
              * the array, use {obj}.{shape} where obj is the name
              * of the object and shape is the name of the array in
              * the object. In this case, shapes is the name of the
              * object and its parameters are boxes, cylinders, and
              * spheres. If we wanted to access the array for the
              * boxes, we would use shapes.boxes.
              * 
              * Contains global variables for transform and
              * transformDrag.
              */}
            <TransformDragContext.Provider value={setTransformDrag}>
              <TransformContext.Provider value={[transform, setTransform]}>
                <SelectedShapeContext.Provider value={[selectedShapes, setSelectedShapes]}>
                  {!transformDrag ? (<OrbitControls ref={orbitControl}/>) : null}

                  {shapes.models.map((props) => (
                    <ModelRenderer key={props.uuid} {...props}/>
                  ))}
                </SelectedShapeContext.Provider>
              </TransformContext.Provider>
            </TransformDragContext.Provider>

            {/* If grid is true, add the grid onto the canvas. Else,
              * do not put anything into the canvas.
              */}
            {grid ? (
              <gridHelper
                position={[0, -0.51, 0]}
                args={[100, 100, '#89898e', '#adadb4']}
              />
            ) : null}
          </Canvas>
        </Pane>

        {/* Outliner Menu */}
        <Pane
          className='pane-outliner'
          initialSize='350px'
          minSize='250px'
          maxSize='350px'
        >
          {/* This will divide the list of assets in scene from the other scene options. */}
          <SplitPane className='splitpane' split='horizontal'>
            {/* Top Pane */}
            <Pane
              className='pane-outliner'
              initialSize='350px'
              minSize='250px'
            >
            </Pane>

            {/* Bottom Pane */}
            <Pane>
              <GridContext.Provider value={setGrid}>
                <Outliner />
              </GridContext.Provider>
            </Pane>
          </SplitPane>
        </Pane>
      </SplitPane>
    </>
  );
}
