import '../styles/toggle.css';

/**
 * Toggle: this is a simple checkbox toggle with transition animation
 *
 * @returns {object} JSX containing the toggle
 */
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
