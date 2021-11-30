export function convertColor(color) {
  // Convert hex string to an rgb object
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16) / 255,
          g: parseInt(result[2], 16) / 255,
          b: parseInt(result[3], 16) / 255,
        }
      : null;
  };

  // Convert rgb object to a hex string
  const rgbToHex = (rgb) => {
    const componentToHex = (c) => {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    const r = Math.floor(rgb.r * 255);
    const g = Math.floor(rgb.g * 255);
    const b = Math.floor(rgb.b * 255);

    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
  };

  return typeof color === 'string' ? hexToRgb(color) : rgbToHex(color);
}
