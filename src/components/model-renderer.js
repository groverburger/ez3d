import React, { useRef } from 'react';
import { useTransform, useColor , useShader} from './context';

export default function ModelRenderer(props) {
  const meshRef = useRef();
  const { setTargetToTransform } = useTransform();
  const { setCurrentColor, setTargetToColor } = useColor();
  const { setCurrentShade, setTargetToShade } = useShader();

  //Helper function for rgbToHex
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  //Convert color to hex and set it
  const handleColorConversion = (color) => {
    const r = Math.floor(color.r * 255);
    const g = Math.floor(color.g * 255);
    const b = Math.floor(color.b * 255);

    const hex = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
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
          setTargetToShade(event.object);
        }}
        ref={meshRef}
      >
        {props.type === 'cube' ? (
          <>
            <boxBufferGeometry attach='geometry' />
            <meshStandardMaterial attach='material' color='hotpink' />
          </>
        ) : null}

        {props.type === 'cylinder' ? (
          <>
            <cylinderBufferGeometry attach='geometry' />
            <meshStandardMaterial attach='material' color='green' />
          </>
        ) : null}

        {props.type === 'sphere' ? (
          <>
            <sphereBufferGeometry attach='geometry' />
            <meshStandardMaterial attach='material' color='blue' />
          </>
        ) : null}
      </mesh>
    </>
  );
}
