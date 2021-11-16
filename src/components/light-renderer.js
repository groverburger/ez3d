import { useLight } from './context';
import { AmbientLight, DirectionalLight, PointLight } from './lights';

export default function LightRenderer(props) {
  const { setLightWindowType, setLightWindowToggle } = useLight();

  // If light is clicked, then setLightWindowType to its type and setLightWindowToggle to on
  const handleLightClick = (type) => {
    setLightWindowType(type);
    setLightWindowToggle(true);
  };

  // If anywhere but the light is clicked, then setLightWindowToggle to off
  const handleWindowClose = () => {
    setLightWindowType(null);
    setLightWindowToggle(false);
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
