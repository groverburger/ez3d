import Number from './number-input';
import ColorSelect from './color-selector';
import ShadeSelector from './shade-selector';

import '../styles/model-window.css';

export default function ModelWindow() {
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
          <ShadeSelector />
        </div>
      </div>
    </>
  );
}
