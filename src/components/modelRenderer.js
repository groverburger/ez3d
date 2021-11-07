import React, { useState, useContext, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TransformControls } from '@react-three/drei';
import { Controls } from 'react-three-gui';
import { Navbar, Nav } from 'react-bootstrap';
import {
  ShapeContext,
  GridContext,
  TransformContext,
  TransformDragContext
} from './context';

export default function ModelRenderer(props) {
  const trans = useRef();
  const mesh = useRef();

  const [transform, setTransform] = useContext(TransformContext);

  // Get the useState for the transformDrag global variable
  const setTransformDrag = useContext(TransformDragContext);

  useEffect(() => {
    if (trans.current) {
      const controls = trans.current;
      
      

      if (!transform) {
        controls.mode = 'translate';
        setTransform(controls.mode);
      } else {
        controls.mode = transform;
      }

      const handleKeyDown = (event) => {
        switch (event.key) {
          case 'w':
            controls.mode = 'translate';
            setTransform(controls.mode);
            break;

          case 'e':
            controls.mode = 'scale';
            setTransform(controls.mode);
            break;

          case 'r':
            controls.mode = 'rotate';
            setTransform(controls.mode);
            break;

          case 't':
            trans.current.visible = !trans.current.visible;
            break;

          default:
            break;
        }
      }

      // When dragging on TransformControls, set transformDrag to true.
      const callback = (event) => {
        setTransformDrag(event.value);
      }

      controls.addEventListener('dragging-changed', callback);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        controls.removeEventListener('dragging-changed', callback);
        document.removeEventListener('keydown', handleKeyDown);
      }
    }
  });

  return (
    <>
      <TransformControls ref={trans}>
        <mesh {...props} ref={mesh}> </mesh>
      </TransformControls>
    </>
  );
}
