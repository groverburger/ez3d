import { Button } from 'react-bootstrap';
import { useGroup, useModel, useColor, useShader, useTransform } from './context';
import { convertColor } from './color-converter';
import '../styles/object-list.css';

export default function ObjectList() {
  const { modelData } = useModel();
  const { groupList } = useGroup();
  const { setTargetToTransform, targetToTransform } = useTransform();
  const { setCurrentColor, setTargetToColor } = useColor();
  const { setCurrentShade, setTargetToShade } = useShader();

  const total = modelData.length;
  const objList = [];

  for (let i = 0; i < total; i++) {
    objList.push({ name: `Mesh ${i + 1}`, index: i });
  }

  const handleClick = (mesh) => {
    setTargetToTransform(mesh);
    setTargetToColor(mesh);
    setTargetToShade(mesh);
    setCurrentColor(convertColor(mesh.material.color));
  };

  return (
    <>
      <div className='object-list-top'>
        <label className='object-list-title'>Object List</label>
        {objList.map((mesh) => (
          <div key='{mesh}' className='object-list-items'>
            <Button
              className='btn-light object-list-items'
              active={groupList[mesh.index] === targetToTransform}
              onClick={() => handleClick(groupList[mesh.index])}
            >
              {mesh.name}
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
