import React, { useState, useContext, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Navbar, Nav } from 'react-bootstrap';

import {
  GridContext,
  LightContext,
  ShapeContext,
  TransformContext,
  useTransform,
} from './components/context';

import {
  AmbientLight,
  DirectionalLight,
  PointLight,
} from './components/lights';

import SplitPane from 'react-split-pane/lib/SplitPane';
import Pane from 'react-split-pane/lib/Pane';
import NavFile from './components/nav-file';
import NavEdit from './components/nav-edit';
import NavAdd from './components/nav-add';
import LightWindow from './components/light-window';
import SceneWindow from './components/scene-window';
import ObjectList from './components/object-list';
import Toolbar from './components/toolbar';
import Controls from './components/controls';
import Viewcube from './components/viewcube';

import './App.css';
import './styles/navbar.css';

/**
 * Edited by Ruiyang
 * Create a box on origin.
 * Reference: https://codesandbox.io/s/r3f-basic-demo-forked-6q6ww?file=/src/App.js:600-604
 *
 * Edited by Eric
 * Transform controls.
 * Reference: https://codesandbox.io/s/react-three-fiber-gestures-hc8gm?file=/src/index.js
 *
 * Edited by Antonio
 * Added hotkeys for the transform controls. The state value is to tell the toolbar
 * what is the currently selected. The parameter transform contains the strings of
 * the transform modes (translate, scale, rotate).
 *
 * BUG!
 * Orbit is native to each object (they can stack on each other,
 * making OrbitControls more and more sensitive)
 */
function ModelRenderer(props) {
  const mesh = useRef();
  const setTargetToTransform = useTransform(
    (state) => state.setTargetToTransform
  );

  return (
    <>
      <mesh
        {...props.positions}
        onClick={(event) => setTargetToTransform(event.object)}
        ref={mesh}
      >
        {props.mesh === 'box' ? (
          <>
            <boxBufferGeometry attach='geometry' />
            <meshLambertMaterial attach='material' color='hotpink' />
          </>
        ) : null}

        {props.mesh === 'cylinder' ? (
          <>
            <cylinderBufferGeometry attach='geometry' />
            <meshLambertMaterial attach='material' color='green' />
          </>
        ) : null}

        {props.mesh === 'sphere' ? (
          <>
            <sphereBufferGeometry attach='geometry' />
            <meshLambertMaterial attach='material' color='blue' />
          </>
        ) : null}
      </mesh>
    </>
  );
}

function LightRenderer(props) {
  const lightValue = useContext(LightContext);
  const setLights = lightValue;

  const handleLightClick = (type) => {
    setLights((prevLights) => {
      return { ...prevLights, type: type, window: true };
    });
  };

  const handleWindowClose = (type) => {
    setLights((prevLights) => {
      return { ...prevLights, type: type, window: false };
    });
  };

  return (
    <>
      {props.type === 'ambient' ? (
        <>
          <AmbientLight
            {...props}
            onClick={() => handleLightClick(props.type)}
            onClose={() => handleWindowClose(props.type)}
          />
        </>
      ) : null}

      {props.type === 'directional' ? (
        <>
          <DirectionalLight
            {...props}
            onClick={() => handleLightClick(props.type)}
            onClose={() => handleWindowClose(props.type)}
          />
        </>
      ) : null}

      {props.type === 'point' ? (
        <>
          <PointLight
            {...props}
            onClick={() => handleLightClick(props.type)}
            onClose={() => handleWindowClose(props.type)}
          />
        </>
      ) : null}
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
 * grid, setGrid              A hook that saves the on or off state of the switch. The grid parameter is a variable
 *                            that holds the current state. Its default is true. The setGrid parameter is a function
 *                            that changes the state of grid.
 *
 * transform, setTransform    A hook that determines what transform control to use. The transform parameter is a
 *                            string of one of the transform control modes: translate, scale, or rotate. The
 *                            setTransform parameter is a function that changes the mode of the transform control.
 *                            This hook is linked to the toolbar, therefore whatever button is currently active, it
 *                            will use setTransform to update the transform parameter to have the currently selected
 *                            mode's string.
 *
 * shapes, setShapes          A hook that determines the number of shapes we should generate. The shapes parameter
 *                            is an object that contains the arrays for each shape. The setShapes parameter is a
 *                            function that adds another shape to the relevant arrays. Basically, instead of having
 *                            three different arrays for the shapes, we can instead have one object in which we can
 *                            call upon to get the relevant array.
 */
export default function App() {
  const [grid, setGrid] = useState(true);
  const [transform, setTransform] = useState('');
  const [shapes, setShapes] = useState({
    boxes: [],
    cylinders: [],
    spheres: [],
  });
  const [lights, setLights] = useState({
    ambient: [],
    directional: [],
    point: [],
    type: '',
    window: false,
  });

  const { targetToTransform } = useTransform();

  return (
    <>
      {/* Navigation bar with file, edit, add, etc.
       * Reference: https://react-bootstrap.github.io/components/navbar/
       *
       * ShapeContext.Provider    All components under this component can receive and respond to the global state
       *                          value that is set in the 'value' parameter. This particular provider saves the state
       *                          of the shapes needed to be generated.
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
      <LightContext.Provider value={setLights}>
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
      </LightContext.Provider>

      {/* Splits the window into two. The left side is the viewport and the right side is the outliner.
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
            <Viewcube />

            <ambientLight intensity={0.5} />
            <spotLight position={[0, 5, 10]} angle={0.3} />
            <fog attach='fog' args={['#dddde0', 10, 40]} />

            <OrbitControls makeDefault />

            {/* Anything put into the array will be added onto the canvas. The arrays are inside an object. To
             *  access the array, use {obj}.{shape} where obj is the name of the object and shape is the name of the
             *  array in the object. In this case, shapes is the name of the object and its parameters are boxes,
             *  cylinders, and spheres. If we wanted to access the array for the boxes, we would use shapes.boxes.
             *  Contains global variables for transform and transformDrag.
             */}
            <TransformContext.Provider value={[transform, setTransform]}>
              {targetToTransform && <Controls object={targetToTransform} />}

              {shapes.boxes.map((positions) => (
                <ModelRenderer
                  key='{box}'
                  positions={{ ...positions }}
                  mesh='box'
                />
              ))}

              {shapes.cylinders.map((positions) => (
                <ModelRenderer
                  key='{cylinder}'
                  positions={{ ...positions }}
                  mesh='cylinder'
                />
              ))}

              {shapes.spheres.map((positions) => (
                <ModelRenderer
                  key='{sphere}'
                  positions={{ ...positions }}
                  mesh='sphere'
                />
              ))}
            </TransformContext.Provider>

            <LightContext.Provider value={setLights}>
              {lights.ambient.map((positions) => (
                <LightRenderer
                  key='{ambient}'
                  positions={{ ...positions }}
                  type='ambient'
                />
              ))}

              {lights.directional.map((positions) => (
                <LightRenderer
                  key='{directional}'
                  positions={{ ...positions }}
                  type='directional'
                />
              ))}

              {lights.point.map((positions) => (
                <LightRenderer
                  key='{point}'
                  positions={{ ...positions }}
                  type='point'
                />
              ))}
            </LightContext.Provider>

            {/* If grid is true, add the grid onto the canvas. */}
            {grid && (
              <gridHelper
                position={[0, -0.51, 0]}
                args={[100, 100, '#89898e', '#adadb4']}
              />
            )}
          </Canvas>
        </Pane>

        {/* Outliner Menu */}
        <Pane
          className='pane-outliner'
          initialSize='350px'
          minSize='250px'
          maxSize='350px'
        >
          {/* This will divide the List of assets in scene from the Other scene options. */}
          <SplitPane split='horizontal'>
            {/* Top Pane */}
            <Pane
              className='object-list-pane'
              initialSize='350px'
              minSize='250px'
            >
              {/* ShapeContext.Provider allows ObjectList to access the array of shapes. */}
              <LightContext.Provider value={lights}>
                <ShapeContext.Provider value={shapes}>
                  <ObjectList />
                </ShapeContext.Provider>
              </LightContext.Provider>
            </Pane>

            {/* Bottom Pane */}
            <Pane className='scene-window-pane'>
              <LightContext.Provider value={lights}>
                <GridContext.Provider value={setGrid}>
                  {lights.window ? <LightWindow /> : <SceneWindow />}
                </GridContext.Provider>
              </LightContext.Provider>
            </Pane>
          </SplitPane>
        </Pane>
      </SplitPane>
    </>
  );
}
