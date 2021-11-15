import { NavDropdown } from 'react-bootstrap';
import * as context from './context';
import '../styles/navbar.css';

export default function NavFile() {
  const { modelData, replaceModelData } = context.useModel();
  const { lightData, setLightData } = context.useLight();
  const { groupList, setGroupList } = context.useGroup();
  const { isGridVisible, setGrid, isShadowsVisible, setShadows } = context.useScene();

  return (
    <div className='navbar-items'>
      <NavDropdown title='File' id='file-dropdown'>
        <NavDropdown.Item href='#action/2.0'>New</NavDropdown.Item>
        <NavDropdown.Item href='#action/2.0' accept=".ez3d" onClick={() => save()}>Save</NavDropdown.Item>
        <NavDropdown.Item href='#action/2.0'>
          <input type="file" id="file" onChange={e => load(e)}/>
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href='#action/2.1'>Import</NavDropdown.Item>
        <NavDropdown.Item href='#action/2.2'>Export</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href='#action/2.3'>Settings</NavDropdown.Item>
      </NavDropdown>
    </div>
  );

  function save() {
    const savedata = JSON.stringify({
      modelData: modelData,
      lightData: lightData,
      groupList: groupList,
      isGridVisible: isGridVisible,
      setShadows: setShadows,
    })

    download("project.ez3d", savedata);
  }

  function load(event) {
    const reader = new FileReader()
    //console.log(modelData)
    reader.addEventListener("load", () => {
      const result = JSON.parse(reader.result)
      //console.log(result)
      replaceModelData(result.modelData)
    })
    reader.readAsText(event.target.files[0])
  }
}

// from https://stackoverflow.com/questions/2897619/using-html5-javascript-to-generate-and-save-a-file
function download(filename, text) {
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  pom.setAttribute('download', filename);

  if (document.createEvent) {
    var event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);
    pom.dispatchEvent(event);
  }
  else {
    pom.click();
  }
}
