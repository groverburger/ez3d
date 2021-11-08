import React, { useRef, useEffect } from 'react'
import { TransformControls } from '@react-three/drei'

export default function ModelControls(props) {
  let transformRef = useRef()
  let selectionMode = props.owner.state.selectionMode
  const setSelectionMode = mode => {
    props.owner.setState({selectionMode: mode})
    selectionMode = mode
  }

  useEffect(() => {
    if (transformRef.current) {
      const controls = transformRef.current

      if (!selectionMode) {
        controls.mode = 'translate'
        setSelectionMode(controls.mode)
      } else {
        controls.mode = selectionMode
      }

      const handleKeyDown = event => {
        switch (event.key) {
          case 'w':
            controls.mode = 'translate'
            setSelectionMode(controls.mode)
            break

          case 'e':
            controls.mode = 'scale'
            setSelectionMode(controls.mode)
            break

          case 'r':
            controls.mode = 'rotate'
            setSelectionMode(controls.mode)
            break

          case 't':
            controls.visible = !controls.visible
            break

          default:
            break
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => { document.removeEventListener('keydown', handleKeyDown) }
    }
  })

  return <TransformControls size={0.4} object={props.object} ref={transformRef}/>
}
