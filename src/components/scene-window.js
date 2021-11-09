import React from 'react';

import Toggle from './toggle';

import '../styles/scene-window.css';

export default function SceneWindow(props) {
  return (
    <>
      <div className='scene-window-top'>
        <label className='scene-window-title'>Scene</label>
        <div className='scene-window-items'>
          <label>Grid</label>
          <Toggle
            onChange={() =>
              props.owner.setState({ showGrid: !props.owner.state.showGrid })
            }
          />
        </div>
        <div className='scene-window-items'>
          <label>Camera</label>
          <input className='camera' />
        </div>
      </div>
    </>
  );
}
