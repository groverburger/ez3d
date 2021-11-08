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
    if (!transformRef.current) return

    const controls = transformRef.current

    if (!selectionMode) {
      controls.mode = "translate"
      setSelectionMode(controls.mode)
    } else {
      controls.mode = selectionMode
    }

    const handleKeyDown = event => {
      if (event.key == "w") {
        controls.mode = "translate"
        setSelectionMode(controls.mode)
      }

      if (event.key == "e") {
        controls.mode = "scale"
        setSelectionMode(controls.mode)
      }

      if (event.key == "r") {
        controls.mode = "rotate"
        setSelectionMode(controls.mode)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => { document.removeEventListener("keydown", handleKeyDown) }
  })

  return <TransformControls size={0.4} object={props.object} ref={transformRef}/>
}
