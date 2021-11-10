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

  // Pass the properties in the light list as props; pass the functions as props - pass the above
  // functions as props called onClick and onClose for the components to use
  return (
    <>
      {props.type === 'ambient' ? (
        <>
          <AmbientLight
            {...props}
            onClick={() => handleLightClick(props.type)}
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
