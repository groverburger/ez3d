import { NavDropdown } from 'react-bootstrap';
import { serialize, deserialize } from './serialize';
import '../styles/navbar.css';
import * as context from './context';

export default function NavFile() {
  const { replaceModelData } = context.useModel();
  const { groupList } = context.useGroup();

  return (
    <div className='navbar-items'>
      <NavDropdown title='File' id='file-dropdown'>
        <NavDropdown.Item href='#action/2.0'>New</NavDropdown.Item>
        <NavDropdown.Item
          href='#action/2.0'
          accept='.ez3d'
          onClick={() => save()}
        >
          Save
        </NavDropdown.Item>
        <NavDropdown.Item href='#action/2.0'>
          <input type='file' id='file' onChange={(e) => load(e)} />
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href='#action/2.1'>Import</NavDropdown.Item>
        <NavDropdown.Item href='#action/2.2'>Export</NavDropdown.Item>
        <NavDropdown.Divider className='nav-divider' />
        <NavDropdown.Item href='#action/2.3'>Settings</NavDropdown.Item>
      </NavDropdown>
    </div>
  );

  function serialize() {
    const serialized = {
      models: [],
      lights: [],
    }

    for (const thing of groupList) {
      // check if this thing is a model or a light
      // and put it in the correct category
      if (thing.children[0]) {
        serialized.lights.push({
          // TODO
        })
      } else {
        serialized.models.push({
          uuid: Math.random(),
          position: thing.position,
          rotation: thing.rotation.toVector3(),
          scale: thing.scale,
          color: thing.material.color,
          geometryType: new String(thing.geometry.type),
        })
      }
    }

    return JSON.stringify(serialized)
  }

  function deserialize(serialized) {
    const data = JSON.parse(serialized)
    console.log(data.models)
    //const { isMeshVisible, isGridVisible, isShadowsVisible } = context.useScene();

    replaceModelData(data.models)
  }

  function save() {
    const data = serialize()
    console.log(data)
    download('project.ez3d', data);
  }

  function load(event) {
    console.log("test")
    const reader = new FileReader()
    reader.addEventListener("load", () => {
      deserialize(reader.result)
    })
    reader.readAsText(event.target.files[0])
  }
}

// from https://stackoverflow.com/questions/2897619/using-html5-javascript-to-generate-and-save-a-file
function download(filename, text) {
  var pom = document.createElement('a');
  pom.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  );
  pom.setAttribute('download', filename);

  if (document.createEvent) {
    var event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);
    pom.dispatchEvent(event);
  } else {
    pom.click();
  }
}
