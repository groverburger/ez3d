import '../styles/toggle.css';

export function Toggle(props) {
  return (
    <label className='wrapper'>
      <input
        className='input'
        type='checkbox'
        onChange={props.onChange}
        defaultChecked={props.defaultChecked}
      />
      <span className='slider' />
    </label>
  );
}
