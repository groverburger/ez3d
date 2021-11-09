export default function ModelRenderer(props) {
  return (
    <mesh
      {...props}
      onClick={(event) => props.owner.setState({ selected: event.object })}
    >
      <meshPhongMaterial attach='material' color='#4488ff' />
    </mesh>
  );
}
