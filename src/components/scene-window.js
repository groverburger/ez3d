import { Toggle } from './toggle.js';
import { useScene } from './context.js';
import '../styles/scene-window.css';

/**
 * The window that holds the scene's information.
 * 
 * @returns {object} JSX of the window pertaining to the scene.
 */
export function SceneWindow() {
  const { isGridVisible, setGrid, isShadowsVisible, setShadows, isFogVisible, setFog} = useScene();

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
          <label>Fog</label>
          <Toggle
            onChange={(event) => setFog(event.target.checked)}
            defaultChecked={isFogVisible}
          />
        </div>
      </div>
    </>
  );
}
