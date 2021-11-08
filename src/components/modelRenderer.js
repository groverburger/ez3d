import React from 'react';

export default function ModelRenderer(props) {
  const select = event => {
    console.log(event.object)
    props.owner.state.selectedModels = [event.object]
    props.owner.forceUpdate()
  }

  return <mesh {...props} onClick={select}/>
}
