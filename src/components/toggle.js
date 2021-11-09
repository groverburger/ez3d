import React from 'react';
import '../styles/toggle.css';

/**
 * Create a Toggle button. The Toggle button is simply a
 * reskinned checkbox.
 *
 * Toggle    The default state of the button will be checked.
 *           The Toggle button accepts an onChange parameter
 *           that listens to an input's change in value. When
 *           the value changes, the Toggle button will change
 *           its appearance in response to this change (on/off).
 */
export default function Toggle({ onChange }) {
  return (
    <label className='wrapper'>
      <input
        className='input'
        type='checkbox'
        onChange={onChange}
        defaultChecked
      />
      <span className='slider' />
    </label>
  );
}
