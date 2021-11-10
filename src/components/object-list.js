import { useGroup, useModel } from './context';
import { useTransform } from './context';
import '../styles/object-list.css';



// ObjectList populates the top pane of the outliner with a list of Meshes in the scene. The saved state value is
// an object of arrays that holds all the positions for any generated shape. Each array corresponds to their
// respective shape. For more information, look at shapes and setShapes in App.js and ShapeContext in context.js.
export default function ObjectList() {
  const { modelData } = useModel();
  const { groupList } = useGroup();

  var total = modelData.length;
  var objList = [];
  var spheresTot = 0;
  var cubesTot = 0;
  var cylindersTot = 0;
  for (let i = 0; i < total; i++) {
    switch (modelData[i].type){
      case 'cube':
        cubesTot++;
        objList.push({ name: `Cube ${cubesTot}`,
                          index: `${i}`});
        break;
      case 'sphere':
        spheresTot++;
        objList.push({ name: `Sphere ${spheresTot}`,
                          index: `${i}`});
        break;
      case 'cylinder':
        cylindersTot++;
        objList.push({ name: `Cylinder ${cylindersTot}`,
                          index: `${i}`});
        break;
      default:
        objList.push({ name: `Object ${i}`,
                          index: i});
        break;
    }

  }

   console.log(groupList);
  const { setTargetToTransform } = useTransform();
  return (
    <>
      <div className='object-list-top'>
        <label className='object-list-title'>Object List</label>
          {objList.map((mesh) => (
            <div key='{mesh}'>
              <button
                className='btn-light object-list-items'
                onClick={() => setTargetToTransform(groupList[mesh.index])}
              > {mesh.name} </button>
            </div>
          ))}
      </div>
    </>
  );
}
