import { useLight } from './context';
import { AmbientLight, DirectionalLight, PointLight } from './lights';

export default function LightRenderer(props) {
  const { setWindowType, setWindowToggle } = useLight();

  // If light is clicked, then setWindowType to its type and setWindowToggle to on
  const handleLightClick = (type) => {
    setWindowType(type);
    setWindowToggle(true);
  };

  // If anywhere but the light is clicked, then setWindowToggle to off
  const handleWindowClose = (type) => {
    setWindowType(type);
    setWindowToggle(false);
  };

  return (
    <>
      {props.type === 'ambient' ? (
        <>
          <AmbientLight
            {...props}
            onClick={() => handleLightClick(props.type)} // Pass above functions as onClick and onClose props
            onClose={() => handleWindowClose(props.type)}
          />
        </>
      ) : null}

      {props.type === 'directional' ? (
        <>
          <DirectionalLight
            {...props}
            onClick={() => handleLightClick(props.type)}
            onClose={() => handleWindowClose(props.type)}
          />
        </>
      ) : null}

      {props.type === 'point' ? (
        <>
          <PointLight
            {...props}
            onClick={() => handleLightClick(props.type)}
            onClose={() => handleWindowClose(props.type)}
          />
        </>
      ) : null}
    </>
  );
}
