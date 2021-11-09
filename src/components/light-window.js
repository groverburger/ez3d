import Range from './range';
import '../styles/light-window.css';

export default function LightWindow(props) {
  return (
    <>
      <div className='light-window-top'>
        {props.owner.state.lights.type === 'ambient' ? (
          <>
            <label className='light-window-title'>Ambient Light</label>
            <div className='light-window-items'>
              <label>Intensity</label>
              <Range {...props} />
            </div>
          </>
        ) : null}

        {props.owner.state.lights.type === 'directional' ? (
          <>
            <label className='light-window-title'>Directional Light</label>
            <div className='light-window-items'>
              <label>Intensity</label>
              <Range {...props} />
            </div>
          </>
        ) : null}

        {props.owner.state.lights.type === 'point' ? (
          <>
            <label className='light-window-title'>Point Light</label>
            <div className='light-window-items'>
              <label>Intensity</label>
              <Range {...props} />
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
