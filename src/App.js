import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TransformControls } from '@react-three/drei';
import { Controls } from 'react-three-gui';
import { Navbar, Nav } from 'react-bootstrap';

import SplitPane from 'react-split-pane/lib/SplitPane';
import Pane from 'react-split-pane/lib/Pane';
import NavFile from './components/nav-file';
import NavEdit from './components/nav-edit';
import NavAdd from './components/nav-add';
import Outliner from './components/outliner';
import Toolbar from './components/toolbar';
import ModelRenderer from './components/modelRenderer';
import ModelControls from './components/modelControls';
import ObjectList from './components/object-list';
import ViewCube from './components/viewcube';

import './App.css';
import './components/navbar.css';

// App is a now a class so that it can store its own data in one convenient place
// now we can pass around references to the App to access its own data

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showGrid: true,
      models: [],
      selected: null,
      selectionMode: "translate",
    }

    // pressing space deselects model, for debug purposes
    document.addEventListener("keydown", event => {
      if (event.key == " ") this.setState({selected: null})
    })
  }

  render() {
    return (
      <>
        <Controls />

        <Navbar className='navbar'>
          <Navbar.Brand className='brand' href='/'>
            EZ-3D
          </Navbar.Brand>
          <Nav className='me-auto'>
            <NavFile />
            <NavEdit />
            <NavAdd owner={this}/>
          </Nav>
        </Navbar>

        <SplitPane className='splitpane' split='vertical'>
          <Pane className='pane-canvas'>
            <Toolbar owner={this}/>

            <Canvas className='canvas' camera={{position: [3, 3, 3]}}>
              <ViewCube/>
              <ambientLight intensity={0.5} />
              <spotLight position={[0, 5, 10]} angle={0.3} />
              <fog attach='fog' args={['#dddde0', 10, 40]} />
              {this.state.selected && this.state.selected.type == "model" && <ModelControls owner={this} object={this.state.selected.object}/>}
              {!this.state.selected && <OrbitControls/>}
              {this.state.models.map(data => <ModelRenderer owner={this} key={data.uuid} {...data}/>)}
              {this.state.showGrid && <gridHelper position={[0, -0.5, 0]} args={[100, 100, '#89898e', '#adadb4']}/>}
            </Canvas>
          </Pane>

          <Pane className='pane-outliner' initialSize='350px' minSize='250px' maxSize='350px' >
            <SplitPane className='splitpane' split='horizontal'>
              <Pane className='pane-outliner' initialSize='350px' minSize='250px'>
                <ObjectList owner={this}/>
              </Pane>

              <Pane>
                <Outliner owner={this}/>
              </Pane>
            </SplitPane>
          </Pane>
        </SplitPane>
      </>
    )
  }
}
