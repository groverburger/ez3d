import { useScene } from './context';
import Toggle from './toggle';
import ColorSelector from './color-selector';
import ShadeSelector from './shade-selector';
import '../styles/scene-window.css';

export default function SceneWindow() {
  const { setGrid, setShadows } = useScene();

  return (
    <>
      <div className='scene-window-top'>
        <label className='scene-window-title'>Scene</label>
        <div className='scene-window-items'>
          <label>Grid</label>
          <Toggle onChange={(event) => setGrid(event.target.checked)} defaultChecked={true} />
        </div>
        <div className='scene-window-items'>
          <label>Shadows</label>
          <Toggle onChange={(event) => setShadows(event.target.checked)} defaultChecked={true} />
        </div>
        <div className='scene-window-items'>
          <label>Color</label>
          <ColorSelector />
        </div>
        <div className='scene-window-items'>
          <label>Shader</label>
          <ShadeSelector />
        </div>
        <div className='scene-window-items'>
          <label>Camera</label>
          <input className='camera' />
        </div>
      </div>
    </>
  );
}
