import { useScene } from './context';

export default function Fog() {
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