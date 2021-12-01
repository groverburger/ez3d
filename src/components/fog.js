import { useScene } from './context.js';

/**
 * Gets state of fog toggle from scene
 * @returns {object} JSX fog if the toggle is on
 */
export function Fog() {
  const { isFogVisible } = useScene();

  return (
    <>
      {isFogVisible && (
        <fog
          attach='fog'
          args={['#bbbbbe', 10, 40]}
        />
      )}
    </>
  );
}
