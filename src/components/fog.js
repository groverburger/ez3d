import { useScene } from './context.js';

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
