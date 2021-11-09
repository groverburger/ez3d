import '../styles/range.css';

export default function Range(props) {
  const handleRangeChange = (event) => {
    props.owner.state.lights.selected.intensity = event.target.value / 100;
    props.owner.state.lights.intensity =
      props.owner.state.lights.selected.intensity;
    props.owner.forceUpdate();
  };

  return (
    <div className='range-container'>
      <div className='slider-value'>
        <span>{`${Math.floor(
          props.owner.state.lights.intensity * 100
        )}%`}</span>
      </div>
      <div className='field'>
        <input
          type='range'
          min='0'
          max='100'
          defaultValue={Math.floor(props.owner.state.lights.intensity * 100)}
          onChange={(event) => handleRangeChange(event)}
          steps='1'
        />
      </div>
    </div>
  );
}
