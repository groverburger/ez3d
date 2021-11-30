import { Number } from './number-input.js';
import { ColorSelect } from './color-selector.js';
import { ShadeSelect } from './shade-selector.js';
import { Visibility } from './visibility-toggle.js';
import '../styles/model-window.css';

export function ModelWindow() {
  return (
    <>
      <div className='model-window-top'>
        <label className='model-window-title'>Model</label>
        <div className='model-window-items-transformation'>
          <div className='model-window-items-transformation label'>
            <label>Transformation</label>
          </div>
          <Number />
        </div>
        <div className='model-window-items'>
          <label>Color</label>
          <ColorSelect />
        </div>
        <div className='model-window-items'>
          <label>Shader</label>
          <ShadeSelect />
        </div>
        <div className='model-window-items'>
          <label>Visibility</label>
          <Visibility />
        </div>
      </div>
    </>
  );
}
