import { useLight, useProperty } from './context';
import Range from './range-input';
import Number from './number-input';
import ColorSelect from './color-selector';
import '../styles/light-window.css';

export default function LightWindow() {
  const { currentIntensity } = useProperty();
  const { lightWindowInfo } = useLight();

  // If the window info is of a type, then label the window as such
  return (
    <>
      <div className='light-window-top'>
        {lightWindowInfo.lightType === 'ambient' || lightWindowInfo.lightType === 'AmbientLight' ? (
          <>
            <label className='light-window-title'>Ambient Light</label>
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
        ) : null}

        {lightWindowInfo.lightType === 'directional' || lightWindowInfo.lightType === 'DirectionalLight' ? (
          <>
            <label className='light-window-title'>Directional Light</label>
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
        ) : null}

        {lightWindowInfo.lightType === 'point' || lightWindowInfo.lightType === 'PointLight' ? (
          <>
            <label className='light-window-title'>Point Light</label>
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
        ) : null}
      </div>
    </>
  );
}
