import { useColor, useTarget } from './context';
import { convertColor } from './color-converter';

export default function ColorSelect() {
  const { currentColor, setCurrentColor } = useColor();
  const { targetMesh } = useTarget();

  // Handler for input (converts value into hex)
  const handleInputChange = (event) => {
    const rgb = convertColor(event.target.value);

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
    />
  );
}
