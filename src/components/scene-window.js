import React, { useContext } from 'react';
import { GridContext } from './context';

import Toggle from './toggle';

import '../styles/scene-window.css';

export default function SceneWindow() {
  const value = useContext(GridContext);
  const setGrid = value;

  return (
    <>
      <div className='scene-window-top'>
        <label className='scene-window-title'>Scene</label>
        <div className='scene-window-items'>
          <label>Grid</label>
          <Toggle onChange={(event) => setGrid(event.target.checked)} />
        </div>
        <div className='scene-window-items'>
          <label>Camera</label>
          <input className='camera' />
        </div>
      </div>
    </>
  );
}
