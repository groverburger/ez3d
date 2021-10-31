import React, { useContext } from 'react';
import { GridContext } from './context';

import Toggle from './toggle';

import './outliner.css';

export default function Outliner() {
  const value = useContext(GridContext);
  const setGrid = value;

  return (
    <>
      <div className='outliner-top'>
        <label className='outliner-title'>Scene</label>
        <div className='outliner-items'>
          <label>Grid</label>
          <Toggle onChange={(event) => setGrid(event.target.checked)} />
        </div>
        <div className='outliner-items'>
          <label>Camera</label>
          <input className='camera' />
        </div>
      </div>
    </>
  );
}
