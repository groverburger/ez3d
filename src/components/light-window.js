import { useLight } from './context';
import Range from './range';
import '../styles/light-window.css';

export default function LightWindow() {
  const { windowInfo } = useLight();

  // If the window info is of a type, then label the window as such
  return (
    <>
      <div className='light-window-top'>
        {windowInfo.lightType === 'ambient' ? (
          <>
            <label className='light-window-title'>Ambient Light</label>
            <div className='light-window-items'>
              <label>Intensity</label>
              <Range />
            </div>
          </>
        ) : null}

        {windowInfo.lightType === 'directional' ? (
          <>
            <label className='light-window-title'>Directional Light</label>
            <div className='light-window-items'>
              <label>Intensity</label>
              <Range />
            </div>
          </>
        ) : null}

        {windowInfo.lightType === 'point' ? (
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
