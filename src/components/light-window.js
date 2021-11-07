import React, { useContext } from 'react';
import { LightContext } from './context';

import Range from './range';

import './light-window.css';

export default function LightWindow() {
  const lightValue = useContext(LightContext);
  const lights = lightValue;

  return (
    <>
      <div className='light-window-top'>
        {lights.type === 'ambient' ? (
          <>
            <label className='light-window-title'>Ambient Light</label>
            <div className='light-window-items'>
              <label>Intensity</label>
              <Range />
            </div>
          </>
        ) : null}

        {lights.type === 'directional' ? (
          <>
            <label className='light-window-title'>Directional Light</label>
            <div className='light-window-items'>
              <label>Intensity</label>
              <Range />
            </div>
          </>
        ) : null}

        {lights.type === 'point' ? (
          <>
            <label className='light-window-title'>Point Light</label>
            <div className='light-window-items'>
              <label>Intensity</label>
              <Range />
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
