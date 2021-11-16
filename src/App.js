import React from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Outline } from '@react-three/postprocessing';
import { Navbar, Nav } from 'react-bootstrap';
import { useLight, useModel, useTarget } from './components/context';

import Controls from './components/controls';
import LightRenderer from './components/light-renderer';
import ModelRenderer from './components/model-renderer';
import ObjectList from './components/object-list';
import LightWindow from './components/light-window';
import ModelWindow from './components/model-window';
import SceneWindow from './components/scene-window';
import NavFile from './components/nav-file';
import NavEdit from './components/nav-edit';
import NavAdd from './components/nav-add';
import SplitPane from 'react-split-pane/lib/SplitPane';
import Pane from 'react-split-pane/lib/Pane';
import Toolbar from './components/toolbar';
import Viewcube from './components/viewcube';
import Group from './components/group';
import Grid from './components/grid';
import HotKeys from './components/hotkeys';

import './App.css';
import './styles/navbar.css';

export default function App() {
  const { modelData, isModelWindowOpen } = useModel();
  const { lightData, lightWindowInfo } = useLight();
  const { hoveredMesh } = useTarget();

  // Reference: https://codesandbox.io/s/basic-demo-forked-v8ji5?file=/src/App.js:1036-1079
  // Selection is done on the outermost mesh - not the innermost mesh
  const intersectionsFilter = (intersections) => {
    return intersections?.length ? [intersections[0]] : intersections
  }

  return (
    <>
      <HotKeys>
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

        <SplitPane className='splitpane' split='vertical'>
          <Pane className='pane-canvas'>
            <Toolbar />

            <Canvas
              camera={{ position: [3, 3, 3] }}
              raycaster={{ filter: intersectionsFilter }}
              shadows
            >
              <color attach='background' args={['#bbbbbe']} />
              <fog attach='fog' args={['#bbbbbe', 10, 40]} />
              <ambientLight intensity={0.5} />
              <pointLight position={[0, 5, 10]} intensity={0.5} />
              <pointLight position={[0, -5, -10]} intensity={0.5} />

              <Grid />
              <Controls />
              <Viewcube />

              <Group>
                {modelData.map((data) => (
                  <ModelRenderer key={data.uuid} { ...data } />
                ))}

                {lightData.map((data) => (
                  <LightRenderer key={data.uuid} { ...data } />
                ))}
              </Group>

              <EffectComposer multisampling={8} autoClear={false}>
                <Outline
                  blur
                  selection={hoveredMesh ? [hoveredMesh] : undefined}
                  visibleEdgeColor='white'
                  edgeStrength={100}
                  width={1000}
                />
              </EffectComposer>
            </Canvas>
          </Pane>

          <Pane
            className='pane-outliner'
            initialSize='300px'
            minSize='300px'
            maxSize='300px'
          >
            <SplitPane split='horizontal'>
              <Pane
                className='object-list-pane'
                initialSize='350px'
                minSize='250px'
              >
                <ObjectList />
              </Pane>

              <Pane className='scene-window-pane'>
                {lightWindowInfo.isWindowOpen ? <LightWindow /> :
                  isModelWindowOpen ? <ModelWindow /> :
                  <SceneWindow />
                }
              </Pane>
            </SplitPane>
          </Pane>
        </SplitPane>
      </HotKeys>
    </>
  );
}
