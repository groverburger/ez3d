import { Scene, Matrix4 } from 'three';
import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useThree, createPortal } from '@react-three/fiber';
import { OrthographicCamera, useCamera } from '@react-three/drei';

/**
 * Reference: https://codesandbox.io/s/viewcube-py4db?file=/src/App.js
 */
export default function Viewcube() {
  const { gl, scene, camera, size } = useThree();
  const virtualScene = useMemo(() => new Scene(), []);
  const virtualCam = useRef();
  const ref = useRef();
  const [hover, set] = useState(null);
  const matrix = new Matrix4();

  const setCameraPosition = (event) => {
    switch (Math.floor(event.faceIndex / 2)) {
      // Positive X
      case 0:
        camera.position.set(5, 0, 0);
        break;

      // Negative X
      case 1:
        camera.position.set(-5, 0, 0);
        break;

      // Positive Y
      case 2:
        camera.position.set(0, 5, 0);
        break;

      // Negative Y
      case 3:
        camera.position.set(0, -5, 0);
        break;

      // Positive Z
      case 4:
        camera.position.set(0, 0, 5);
        break;

      // Negative Z
      case 5:
        camera.position.set(0, 0, -5);
        break;

      default:
        break;
    }
  };

  const setViewcubeColor = (hover, index) => {
    let color = '';

    switch (true) {
      // X
      case hover === index && (index === 0 || index === 1):
        color = 'red';
        break;

      // Y
      case hover === index && (index === 2 || index === 3):
        color = 'lime';
        break;

      // Z
      case hover === index && (index === 4 || index === 5):
        color = 'blue';
        break;

      default:
        color = 'lightgray';
        break;
    }

    return color;
  };

  useFrame(() => {
    matrix.copy(camera.matrix).invert();
    ref.current.quaternion.setFromRotationMatrix(matrix);
    gl.autoClear = true;
    gl.render(scene, camera);
    gl.autoClear = false;
    gl.clearDepth();
    gl.render(virtualScene, virtualCam.current);
  }, 1);

  return createPortal(
    <>
      <OrthographicCamera
        ref={virtualCam}
        makeDefault={false}
        position={[0, 0, 100]}
      />
      <mesh
        ref={ref}
        raycast={useCamera(virtualCam)}
        position={[-(size.width / 2 - 80), -(size.height / 2 - 120), 0]}
        onPointerOut={() => set(null)}
        onPointerMove={(event) => set(Math.floor(event.faceIndex / 2))}
        onClick={(event) => {
          setCameraPosition(event);
        }}
      >
        {[...Array(6)].map((_, index) => (
          <meshLambertMaterial
            attachArray='material'
            key={index}
            color={setViewcubeColor(hover, index)}
          />
        ))}
        <boxGeometry args={[60, 60, 60]} />
      </mesh>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </>,
    virtualScene
  );
}

