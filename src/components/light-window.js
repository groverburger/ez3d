import { useLight, useProperty } from './context.js';
import { Range } from './range-input.js';
import { Number } from './number-input.js';
import { ColorSelect } from './color-selector.js';
import '../styles/light-window.css';

export function LightWindow() {
  const { currentIntensity } = useProperty();
  const { lightWindowInfo } = useLight();

  const windowType = (type) => {
    if (type === 'ambient' || type === 'AmbientLight') return 'Ambient Light';
    else if (type === 'directional' || type === 'DirectionalLight') return 'Directional Light';
    else if (type === 'point' || type === 'PointLight') return 'Point Light';
    else return undefined;
  }

  // If the window info is of a type, then label the window as such
  return (
    <>
      <div className='light-window-top'>
        {windowType(lightWindowInfo.lightType) &&
          <>
            <label className='light-window-title'>{windowType(lightWindowInfo.lightType)}</label>
            <div className='light-window-items-transformation'>
              <div className='light-window-items-transformation label'>
                <label>Transformation</label>
              </div>
              <Number />
            </div>
            <div className='light-window-items'>
              <label>Color</label>
              <ColorSelect />
            </div>
            <div className='light-window-items-intensity'>
              <div className='light-window-items-header'>
                <label>Intensity</label>
                <div className='slider-value'>
                  <span>{`${Math.floor(currentIntensity * 100)}%`}</span>
                </div>
              </div>
              <Range />
            </div>
          </>
        }
      </div>
    </>
  );
}
