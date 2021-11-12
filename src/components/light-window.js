import { useLight } from './context';
import Range from './range';
import ColorSelect from './color-selector';
import '../styles/light-window.css';

export default function LightWindow() {
  const { windowInfo, intensity } = useLight();

  // If the window info is of a type, then label the window as such
  return (
    <>
      <div className='light-window-top'>
        {windowInfo.lightType === 'ambient' || windowInfo.lightType === 'AmbientLight' ? (
          <>
            <label className='light-window-title'>Ambient Light</label>
            <div className='light-window-items'>
              <label>Color</label>
              <ColorSelect />
            </div>
            <div className='light-window-items-intensity'>
              <div className='light-window-items-header'>
                <label>Intensity</label>
                <div className='slider-value'>
                  <span>{`${Math.floor(intensity * 100)}%`}</span>
                </div>
              </div>
              <Range />
            </div>
          </>
        ) : null}

        {windowInfo.lightType === 'directional' || windowInfo.lightType === 'DirectionalLight' ? (
          <>
            <label className='light-window-title'>Directional Light</label>
            <div className='light-window-items'>
              <label>Color</label>
              <ColorSelect />
            </div>
            <div className='light-window-items-intensity'>
              <div className='light-window-items-header'>
                <label>Intensity</label>
                <div className='slider-value'>
                  <span>{`${Math.floor(intensity * 100)}%`}</span>
                </div>
              </div>
              <Range />
            </div>
          </>
        ) : null}

        {windowInfo.lightType === 'point' || windowInfo.lightType === 'PointLight' ? (
          <>
            <label className='light-window-title'>Point Light</label>
            <div className='light-window-items'>
              <label>Color</label>
              <ColorSelect />
            </div>
            <div className='light-window-items-intensity'>
              <div className='light-window-items-header'>
                <label>Intensity</label>
                <div className='slider-value'>
                  <span>{`${Math.floor(intensity * 100)}%`}</span>
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
