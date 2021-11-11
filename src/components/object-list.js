import { useGroup, useModel, useColor , useShader} from './context';
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

  for (let i = 0; i < total; i++) {
        objList.push({ name: `Mesh ${i+1}`,
                          index: i});
  }

   // console.log(groupList);
  const { setTargetToTransform } = useTransform();
  const { setCurrentColor, setTargetToColor } = useColor();
  const { setCurrentShade, setTargetToShade } = useShader();


  //Helper function for handleColorConversion
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  //Convert color of object to hex and set it
  const handleColorConversion = (color) => {
    const r = Math.floor(color.r * 255);
    const g = Math.floor(color.g * 255);
    const b = Math.floor(color.b * 255);

    const hex = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    setCurrentColor(hex);
  }

  return (
    <>
      <div className='object-list-top'>
        <label className='object-list-title'>Object List</label>
          {objList.map((mesh) => (
            <div key='{mesh}'>
              <button
                className='btn-light object-list-items'
                onClick={() => {
                  setTargetToTransform(groupList[mesh.index]);
                  setTargetToColor(groupList[mesh.index]);
                  handleColorConversion(groupList[mesh.index].material.color);
                  setTargetToShade(groupList[mesh.index]);

                }}
              > {mesh.name} </button>
            </div>
          ))}
      </div>
    </>
  );
}
