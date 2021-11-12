import { useLight, useTarget } from './context';
import '../styles/range.css';

export default function Range() {
  const { intensity, setIntensity } = useLight();
  const { targetMesh } = useTarget();

  // Directly change target light's intensity and save intensity for window
  const handleRangeChange = (event) => {
    targetMesh.children[0].intensity = event.target.value / 100;
    setIntensity(targetMesh.children[0].intensity);
  };

  return (
    <div className='range-container'>
      <div className='field'>
        <input
          type='range'
          min='0'
          max='100'
          defaultValue={Math.floor(intensity * 100)} // Divide and multiply by 100 because in intensity is a decimal
          onChange={(event) => handleRangeChange(event)}
          steps='1'
        />
      </div>
    </div>
  );
}
