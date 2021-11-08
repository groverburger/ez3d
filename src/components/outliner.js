import React from 'react';

import Toggle from './toggle';

import './outliner.css';

export default function Outliner(props) {
  return (
    <>
      <div className='outliner-top'>
        <label className='outliner-title'>Scene</label>
        <div className='outliner-items'>
          <label>Grid</label>
          <Toggle onChange={event => props.owner.setState({showGrid: !props.owner.state.showGrid})} />
        </div>
        <div className='outliner-items'>
          <label>Camera</label>
          <input className='camera' />
        </div>
      </div>
    </>
  );
}
