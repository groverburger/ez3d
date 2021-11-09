import React from 'react';
import { AmbientLight, DirectionalLight, PointLight } from './lights';

export default function LightRenderer(props) {
  const handleLightClick = (type) => {
    props.owner.state.lights.type = type;
    props.owner.state.lights.window = true;
    props.owner.forceUpdate();
  };

  const handleWindowClose = (type) => {
    props.owner.state.lights.type = type;
    props.owner.state.lights.window = false;
    props.owner.forceUpdate();
  };

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
