import * as context from './context.js';


//function to serialize a model into a JSON string
export function serialize() {
  const { groupList } = context.useGroup();
  const serialized = {
    models: [],
    lights: [],
  };

  for (const thing of groupList) {
    // check if this thing is a model or a light
    // and put it in the correct category
    if (thing.children[0]) {
      serialized.lights.push({
        // TODO
      });
    } else {
      serialized.models.push({
        uuid: Math.random(),
        position: thing.position,
        rotation: thing.rotation.toVector3(),
        scale: thing.scale,
        color: thing.material.color,
        geometryType: thing.geometry.type,
        name: thing.name,
      });
    }
  }

  return JSON.stringify(serialized);
}

export function deserialize(serialized) {
  const data = JSON.parse(serialized);
  const { replaceModelData } = context.useModel();
  //const { isMeshVisible, isGridVisible, isShadowsVisible } = context.useScene();

  console.log(data);
  console.log(data.models);
  //replaceModelData(data.models)
}
