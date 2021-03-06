import { useProperty, useTarget, useGroup } from './context.js';
import { convertColor } from './color-converter.js';

/**
 * Check which component is selected
 * Change color for selected component in the correct format
 *
 * @returns {object} JSX containing the new color for the object
 */
export function ColorSelect() {
  const { currentColor, setCurrentColor } = useProperty();
  const { targetMesh } = useTarget();
  const { setStatesList, groupList } = useGroup();

    //function to save the state history
  function serialize() {
    const serialized = {
      models: [],
      lights: [],
    };

    for (const thing of groupList) {
      // check if this thing is a model or a light
      // and put it in the correct category
      if (thing.children[0]) {
        console.log(thing);
        serialized.lights.push({
          uuid: Math.random(),
          position: thing.position,
          type: thing.children[0].type,
        });
      } else {
        let color = thing.material.color;

        if (typeof color != 'object') {
          console.log(color);
        }

        serialized.models.push({
            uuid: Math.random(),
            position: thing.position,
            rotation: thing.rotation.toVector3(),
            scale: thing.scale,
            color: { r: color.r, g: color.g, b: color.b },
            geometryType: thing.geometry.type,
            name: thing.name,
            });
      }
    }

    // saver = serialized;
    setStatesList(JSON.stringify(serialized));
  }

  // Handler for input (converts value into hex)
  const handleInputChange = (event) => {
    const rgb = convertColor(event.target.value);

    //save the state before doing anything
    serialize();

    if (targetMesh) {
      if (targetMesh.children[0]) {
        targetMesh.children[0].color = rgb;
      } else {
        targetMesh.material.color = rgb;
      }
    }

    const hex = convertColor(rgb);
    setCurrentColor(hex);
  };

  return (
    <input
      type='color'
      value={currentColor}
      onInput={(event) => handleInputChange(event)}
      style={{ border: 'none', borderRadius: '0.2rem', outline: 'none' }}
    />
  );
}
