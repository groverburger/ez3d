import { useColor } from './context';

export default function ColorSelect() {
  const { targetToColor, currentColor, setCurrentColor } = useColor();

  //convert hex to decimal for object's color format
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : null;
  }

  //helper for rgbToHex
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  //Convets rgb value to hex
  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  //Handler for input
  const handleInputChange = (event) => {
    const rgb = hexToRgb(event.target.value);
    if(targetToColor){
      targetToColor.material.color = rgb;
    }
    const r = Math.floor(rgb.r * 255);
    const g = Math.floor(rgb.g * 255);
    const b = Math.floor(rgb.b * 255);

    const hex = rgbToHex(r, g, b);
    setCurrentColor(hex);
  };

    return (
        <input
          type="color"
          value={currentColor}
          onInput={(event) => handleInputChange(event)}
        />
    );
  }
