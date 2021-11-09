import '../styles/toggle.css';

export default function Toggle({ onChange }) {
  return (
    <label className='wrapper'>
      <input
        className='input'
        type='checkbox'
        onChange={onChange}
        defaultChecked
      />
      <span className='slider' />
    </label>
  );
}
