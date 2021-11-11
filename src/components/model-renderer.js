import React, { useRef } from 'react';
import { useTransform, useColor } from './context';

export default function ModelRenderer(props) {
  const meshRef = useRef();
  const { setTargetToTransform } = useTransform();
  const { setCurrentColor, setTargetToColor } = useColor();

  //Helper function for rgbToHex
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  //Function to convert color value from decimal to hex
  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  //Convert color to hex and set it
  const handleColorConversion = (color) => {
    const r = Math.floor(color.r * 255);
    const g = Math.floor(color.g * 255);
    const b = Math.floor(color.b * 255);

    const hex = rgbToHex(r, g, b);
    setCurrentColor(hex);
  }

  return (
    <>
      <mesh
        {...props.position}
        onClick={(event) => {
          setTargetToTransform(event.object);
          setTargetToColor(event.object);
          handleColorConversion(event.object.material.color);
        }}
        ref={meshRef}
      >
        {props.type === 'cube' ? (
          <>
            <boxBufferGeometry attach='geometry' />
            <meshLambertMaterial attach='material' color='hotpink' />
          </>
        ) : null}

        {props.type === 'cylinder' ? (
          <>
            <cylinderBufferGeometry attach='geometry' />
            <meshLambertMaterial attach='material' color='green' />
          </>
        ) : null}

        {props.type === 'sphere' ? (
          <>
            <sphereBufferGeometry attach='geometry' />
            <meshLambertMaterial attach='material' color='blue' />
          </>
        ) : null}
      </mesh>
    </>
  );
}
