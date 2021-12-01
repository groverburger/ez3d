import { Button } from 'react-bootstrap';
import { useGroup, useLight, useModel, useProperty, useTarget } from './context.js';
import { convertColor } from './color-converter.js';
import '../styles/object-list.css';

/**
 * ObjectList: A List of meshes and lights that populate the screen
 * List Item consist of a button and a textbox
 * Button: press to select that mesh in the viewport
 * Textbox: names the mesh with user input
 * @returns {object} JSX containing the button and textbox
 */
export function ObjectList() {
  const { setCurrentColor, setCurrentIntensity, setCurrentTransform } = useProperty();
  const { setIsModelWindowOpen } = useModel();
  const { setLightWindowType, setLightWindowToggle } = useLight();
  const { groupList } = useGroup();
  const { setHoveredMesh, setTargetMesh, targetMesh } = useTarget();

  const total = groupList.length;
  const objList = [];

  //push total(# of meshes) indices into objList
  for (let i = 0; i < total; i++) {
    objList.push(i);
  }
  //handles which window(model, light) populates the bottom pane in the outliner
  const handleClick = (mesh) => {
    setTargetMesh(mesh);
    //if mesh has children then it is a light source, open light window
    //else then it is a mesh, open model window
    if (mesh.children[0]) {
      setCurrentIntensity(mesh.children[0].intensity);
      setCurrentColor(convertColor(mesh.children[0].color));
      setCurrentTransform({
        translate: mesh.position,
        rotate: mesh.rotation.toVector3(),
        scale: mesh.scale,
      });
      setLightWindowType(mesh.children[0].type);
      setLightWindowToggle(true);
    } else {
      setCurrentColor(convertColor(mesh.material.color));
      setCurrentTransform({
        translate: mesh.position,
        rotate: mesh.rotation.toVector3(),
        scale: mesh.scale,
      });
      setIsModelWindowOpen(true);
    }
  };
  //Button representing corresponding model, and input box for naming the mesh
  return (
    <>
      <div className='object-list-top'>
        <label className='object-list-title'>Object List</label>

        {objList.map((index) => (
          <div key={groupList[index].uuid} className='object-list-items'>
            <Button
              className='btn-light object-list-items'
              active={groupList[index] === targetMesh}
              onClick={() => handleClick(groupList[index])}
              onPointerOver={() => setHoveredMesh({ current: groupList[index] })}
              onPointerOut={() => setHoveredMesh(null)}
            >
              {groupList[index].name}
            </Button>
            <input
              placeholder="Type Mesh Name"
            />
          </div>
        ))}
      </div>
    </>
  );
}
