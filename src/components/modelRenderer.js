import React from 'react';
import { TransformControls } from '@react-three/drei';

export default class MeshRenderer extends React.Component {
  constructor(props) {
    super(props)
    this.select = this.select.bind(this)
    this.uuid = this.props.uuid
  }

  select() {
    this.props.owner.setState({selectedModels: [this.uuid]})
  }

  render() {
    const ownerState = this.props.owner.state

    if (ownerState.selectedModels.includes(this.uuid)) {
      return (
        <TransformControls mode={ownerState.selectionMode}>
          <mesh {...this.props} onPointerDown={this.select}/>
        </TransformControls>
      )
    }

    return <mesh {...this.props} onPointerDown={this.select}/>
  }
}
