import { Button } from 'react-bootstrap';
import { useGroup, useLight, useModel, useProperty, useTarget } from './context';
import { convertColor } from './color-converter';
import '../styles/object-list.css';

export default function ObjectList() {
  const { setCurrentColor, setCurrentIntensity, setCurrentTransform } = useProperty();
  const { setIsModelWindowOpen } = useModel();
  const { setLightWindowType, setLightWindowToggle } = useLight();
  const { groupList } = useGroup();
  const { setHoveredMesh, setTargetMesh, targetMesh } = useTarget();

  const total = groupList.length;
  const objList = [];

  for (let i = 0; i < total; i++) {
    objList.push(i);
  }

  const handleClick = (mesh) => {
    setTargetMesh(mesh);

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
            <input/>
          </div>
        ))}
      </div>
    </>
  );
}
