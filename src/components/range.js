import React, { useContext } from 'react';
import { RangeContext } from './context';

import './range.css';

export default function Range() {
  const value = useContext(RangeContext);
  const [range, setRange] = value;

  return (
    <div className='range-container'>
      <div className='slider-value'>
        <span>{`${range}%`}</span>
      </div>
      <div className='field'>
        <input
          type='range'
          min='0'
          max='100'
          defaultValue={range}
          onChange={(event) => setRange(event.target.value)}
          steps='1'
        />
      </div>
    </div>
  );
}
