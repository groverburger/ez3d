import { useScene } from './context';

export default function Grid(props) {
  const { isGridVisible, isShadowsVisible } = useScene();

  return (
    <>
      <mesh
        position={[0, -0.51, 0]}
        rotation-x={-Math.PI / 2}
        receiveShadow={isShadowsVisible}
      >
        <planeBufferGeometry args={[100, 100]} attach='geometry' />
        <shadowMaterial attach='material' transparent opacity={0.5} />
      </mesh>
      {isGridVisible && <gridHelper {...props} />}
    </>
  );
}
