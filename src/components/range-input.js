import { useProperty, useTarget } from './context.js';
import '../styles/range-input.css';

export function Range() {
  const { currentIntensity, setCurrentIntensity } = useProperty();
  const { targetMesh } = useTarget();

  // Directly change target light's intensity and save intensity for window
  const handleRangeChange = (event) => {
    targetMesh.children[0].intensity = event.target.value / 100;
    setCurrentIntensity(targetMesh.children[0].intensity);
  };

  return (
    <div className='range-container'>
      <div className='field'>
        <input
          type='range'
          min='0'
          max='100'
          defaultValue={Math.floor(currentIntensity * 100)} // Divide and multiply by 100 because intensity is a decimal
          onChange={(event) => handleRangeChange(event)}
          steps='1'
        />
      </div>
    </div>
  );
}
