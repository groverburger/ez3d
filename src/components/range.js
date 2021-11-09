import { useLight } from './context';
import '../styles/range.css';

export default function Range() {
  const { targetLight, intensity, setIntensity } = useLight();

  // When the range input changes, then change the selected light's intensity
  // Then, setIntensity to save this value so that we can continue to use it even after deselection
  const handleRangeChange = (event) => {
    targetLight.intensity = event.target.value / 100;
    setIntensity(targetLight.intensity);
  };

  // We divide and multiply by 100 because the intensity value is a decimal
  return (
    <div className='range-container'>
      <div className='slider-value'>
        <span>{`${Math.floor(intensity * 100)}%`}</span>
      </div>
      <div className='field'>
        <input
          type='range'
          min='0'
          max='100'
          defaultValue={Math.floor(intensity * 100)}
          onChange={(event) => handleRangeChange(event)}
          steps='1'
        />
      </div>
    </div>
  );
}
