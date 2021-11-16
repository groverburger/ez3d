import { useScene } from './context';
import Toggle from './toggle';
import '../styles/scene-window.css';

export default function SceneWindow() {
  const { isGridVisible, setGrid, isShadowsVisible, setShadows } = useScene();

  return (
    <>
      <div className='scene-window-top'>
        <label className='scene-window-title'>Scene</label>
        <div className='scene-window-items'>
          <label>Grid</label>
          <Toggle
            onChange={(event) => setGrid(event.target.checked)}
            defaultChecked={isGridVisible}
          />
        </div>
        <div className='scene-window-items'>
          <label>Shadows</label>
          <Toggle
            onChange={(event) => setShadows(event.target.checked)}
            defaultChecked={isShadowsVisible}
          />
        </div>
        <div className='scene-window-items'>
          <label>Camera</label>
          <input className='camera' />
        </div>
      </div>
    </>
  );
}
