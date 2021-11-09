import { useLight } from './context';
import { AmbientLight, DirectionalLight, PointLight } from './lights';

export default function LightRenderer(props) {
  const { setWindowType, setWindowToggle } = useLight();

  const handleLightClick = (type) => {
    setWindowType(type);
    setWindowToggle(true);
  };

  const handleWindowClose = (type) => {
    setWindowType(type);
    setWindowToggle(false);
  };

  return (
    <>
      {props.data.type === 'ambient' ? (
        <>
          <AmbientLight
            {...props.data}
            onClick={() => handleLightClick(props.data.type)}
            onClose={() => handleWindowClose(props.data.type)}
            key={`${props.data.type}`}
          />
        </>
      ) : null}

      {props.data.type === 'directional' ? (
        <>
          <DirectionalLight
            {...props.data}
            onClick={() => handleLightClick(props.data.type)}
            onClose={() => handleWindowClose(props.data.type)}
            key={`${props.data.type}`}
          />
        </>
      ) : null}

      {props.data.type === 'point' ? (
        <>
          <PointLight
            {...props.data}
            onClick={() => handleLightClick(props.data.type)}
            onClose={() => handleWindowClose(props.data.type)}
            key={`${props.data.type}`}
          />
        </>
      ) : null}
    </>
  );
}
