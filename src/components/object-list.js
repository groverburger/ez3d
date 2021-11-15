import { Button } from 'react-bootstrap';
import { useGroup, useLight, useProperty, useTarget } from './context';
import { convertColor } from './color-converter';
import '../styles/object-list.css';

export default function ObjectList() {
  const { setCurrentColor, setCurrentIntensity } = useProperty();
  const { setWindowType, setWindowToggle } = useLight();
  const { groupList } = useGroup();
  const { setHoveredMesh, setTargetMesh, targetMesh } = useTarget();

  const total = groupList.length;
  const objList = [];

  let lightCount = 1;
  let modelCount = 1;
  for (let i = 0; i < total; i++) {
    if (groupList[i].children[0]) {
      objList.push({ name: `Light ${lightCount++}`, index: i });
    } else {
      objList.push({ name: `Mesh ${modelCount++}`, index: i });
    }
  }

  const handleClick = (mesh) => {
    setTargetMesh(mesh);

    if (mesh.children[0]) {
      setCurrentIntensity(mesh.children[0].intensity);
      setCurrentColor(convertColor(mesh.children[0].color));
      setWindowType(mesh.children[0].type);
      setWindowToggle(true);
    } else {
      setCurrentColor(convertColor(mesh.material.color));
    }
  };



  return (
    <>
      <div className='object-list-top'>
        <label className='object-list-title'>Object List</label>
        {objList.map((mesh) => (
          <div key={groupList[mesh.index].uuid} className='object-list-items'>
            <Button
              className='btn-light object-list-items'
              active={groupList[mesh.index] === targetMesh}
              onClick={() => handleClick(groupList[mesh.index])}
              onPointerOver={() => setHoveredMesh({current: groupList[mesh.index]})}
              onPointerOut={() => setHoveredMesh(null)}
            >
              {mesh.name}
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
