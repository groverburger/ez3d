import { useLight } from './context';
import { AmbientLight, DirectionalLight, PointLight } from './lights.js';

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
      {props.type === 'AmbientLight' ? (
        <>
          <AmbientLight
            {...props}
            onClick={() => handleLightClick(props.type)} // Pass above functions as onClick and onClose props
            onClose={() => handleWindowClose(props.type)}
          />
        </>
      ) : null}

      {props.type === 'DirectionalLight' ? (
        <>
          <DirectionalLight
            {...props}
            onClick={() => handleLightClick(props.type)}
            onClose={() => handleWindowClose(props.type)}
          />
        </>
      ) : null}

      {props.type === 'PointLight' ? (
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
