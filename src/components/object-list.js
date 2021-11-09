import { useModel } from './context';
import '../styles/object-list.css';

// ObjectList populates the top pane of the outliner with a list of Meshes in the scene. The saved state value is
// an object of arrays that holds all the positions for any generated shape. Each array corresponds to their
// respective shape. For more information, look at shapes and setShapes in App.js and ShapeContext in context.js.
export default function ObjectList() {
  const { modelList } = useModel();

  var total = modelList.length;
  var objList = [];
  for (let i = 0; i < total; i++) {
    objList.push({ name: `Object ${i}` });
  }
  return (
    <>
      <div className='object-list-top'>
        <label className='object-list-title'>Object List</label>
        {objList.map((mesh) => (
          <div key='{mesh}' className='object-list-items'>
            <label> {mesh.name} </label>
          </div>
        ))}
      </div>
    </>
  );
}
