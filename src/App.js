import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Navbar, Nav } from 'react-bootstrap';
import { useLight, useModel, useGrid, useTransform } from './components/context';

import Controls from './components/controls';
import LightRenderer from './components/light-renderer';
import ModelRenderer from './components/model-renderer';
import ObjectList from './components/object-list';
import LightWindow from './components/light-window';
import SceneWindow from './components/scene-window';
import NavFile from './components/nav-file';
import NavEdit from './components/nav-edit';
import NavAdd from './components/nav-add';
import SplitPane from 'react-split-pane/lib/SplitPane';
import Pane from 'react-split-pane/lib/Pane';
import Toolbar from './components/toolbar';
import Viewcube from './components/viewcube';

import './App.css';
import './styles/navbar.css';

export default function App() {
  const { modelList } = useModel();
  const { lightList, windowInfo } = useLight();
  const { isGridVisible } = useGrid();
  const { targetToTransform } = useTransform();

  return (
    <>
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

          <Canvas className='canvas' camera={{ position: [3, 3, 3] }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[0, 5, 10]} angle={0.3} />
            <fog attach='fog' args={['#dddde0', 10, 40]} />

            <Viewcube />
            <OrbitControls makeDefault />
            {targetToTransform && <Controls object={targetToTransform} />}

            {modelList.map((data) => (
              <ModelRenderer key={`${data.type}`} data={{ ...data }} />
            ))}

            {lightList.map((data) => (
              <LightRenderer key={`${data.type}`} data={{ ...data }} />
            ))}

            {isGridVisible && (
              <gridHelper
                position={[0, -0.51, 0]}
                args={[100, 100, '#89898e', '#adadb4']}
              />
            )}
          </Canvas>
        </Pane>

        <Pane
          className='pane-outliner'
          initialSize='350px'
          minSize='250px'
          maxSize='350px'
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
              {windowInfo.isWindowOpen ? <LightWindow /> : <SceneWindow />}
            </Pane>
          </SplitPane>
        </Pane>
      </SplitPane>
    </>
  );
}
