import { useColor } from './context';
import { convertColor } from './color-converter';

export default function ColorSelect() {
  const { targetToColor, currentColor, setCurrentColor } = useColor();

  //Handler for input (converts value into hex)
  const handleInputChange = (event) => {
    const rgb = convertColor(event.target.value);
    if (targetToColor) {
      targetToColor.material.color = rgb;
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
