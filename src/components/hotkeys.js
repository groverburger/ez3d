import React, { useEffect } from 'react';
import { useGroup, useLight, useModel, useTarget } from './context.js';

/**
 * The hotkeys (not including transform controls hotkeys).
 * 
 * @param {object} children
 * @returns {object} JSX containing hotkeys
 */
export function HotKeys({ children }) {
  const { setTargetMesh, targetMesh, setHoveredMesh } = useTarget();
  const {
    delGroupList,
    groupList,
    groupListPrev,
    resetGroupList,
    setStatesList,
    popStatesList,
    statesList,
    redoList,
    popRedoList,
    setRedoList,
    resetUndoLists,
  } = useGroup();

  const {
    modelData,
    deleteModelData,
    setIsModelWindowOpen,
    modelDataPrev,
    replaceModelData,
  } = useModel();

  const {
    deleteLightData,
    lightData,
    setLightWindowToggle,
    setLightWindowType,
    lightDataPrev,
  } = useLight();

  useEffect(() => {
    const serialized = {
      models: [],
      lights: [],
    };

    //function to save the state for undo/redo
    function serialize() {
      for (const thing of groupList) {
        // check if this thing is a model or a light
        // and put it in the correct category
        if (thing.children[0]) {
          console.log(thing);
          serialized.lights.push({
            uuid: Math.random(),
            position: thing.position,
            type: thing.children[0].type,
          });
        } else {
          let color = thing.material.color;

          if (typeof color != 'object') {
            console.log(color);
          }

          serialized.models.push({
            uuid: Math.random(),
            position: thing.position,
            rotation: thing.rotation.toVector3(),
            scale: thing.scale,
            color: { r: color.r, g: color.g, b: color.b },
            geometryType: thing.geometry.type,
            name: thing.name,
            });
        }
      }

      // saver = serialized;
      setStatesList(JSON.stringify(serialized));
    }

    const handleKeyDown = (event) => {
      switch (event.key) {
        // For debugging purposes, print out the state data
        case 'p':
          console.log('Currently Selected Mesh:', targetMesh);
          console.log('Grouplist:', groupList);
          console.log('ModelData:', modelData);
          console.log('LightData:', lightData);
          console.log('GrouplistPrev:', groupListPrev);
          console.log('ModelDataPrev:', modelDataPrev);
          console.log('LightDataPrev:', lightDataPrev);
          break;

        // Deselect target mesh
        case 'Escape':
          setTargetMesh(null); // Remove target mesh
          setLightWindowType(null); // Clear light window type
          setLightWindowToggle(false); // Close light window
          setIsModelWindowOpen(false); // Close model window
          break;

        // shift r to reset the undo history
        case 'c':
            if (event.ctrlKey){
                resetUndoLists();
                console.log('RESET');
            }
          break;

        // ctrl Y to redo your undos
        // before redo executes, first save the state 
        case 'y':
            if (event.ctrlKey && redoList[redoList.length - 1] != null) {
              for (const thing of groupList) {
                // check if this thing is a model or a light
                // and put it in the correct category
                if (thing.children[0]) {
                  console.log(thing);
                  serialized.lights.push({
                    uuid: Math.random(),
                    position: thing.position,
                    type: thing.children[0].type,
                  });
                } else {
                  let color = thing.material.color;

                  if (typeof color != 'object') {
                    console.log(color);
                  }

                  serialized.models.push({
                    uuid: Math.random(),
                    position: thing.position,
                    rotation: thing.rotation.toVector3(),
                    scale: thing.scale,
                    color: { r: color.r, g: color.g, b: color.b },
                    geometryType: thing.geometry.type,
                    name: thing.name,
                  });
                }
              }

              // saver = serialized;
              setStatesList(JSON.stringify(serialized));

              const data = JSON.parse(redoList[redoList.length - 1]);

              popRedoList();
              setTargetMesh(null);
              setHoveredMesh(null);
              setLightWindowToggle(false); // Close light window
              setIsModelWindowOpen(false); // Close model window
              resetGroupList();
              replaceModelData(data.models); // replaceLightData(data.lights)
            }
            break;
        // ctrl z to undo your changes
        // before undo executes, first save the state in the redo list
        case 'z':
          
              // if ctrl is pressed, continue undo
            if (event.ctrlKey) {
              if (statesList[statesList.length - 1] != null) {
                for (const thing of groupList) {
                  // check if this thing is a model or a light
                  // and put it in the correct category
                  if (thing.children[0]) {
                    console.log(thing);
                    serialized.lights.push({
                      uuid: Math.random(),
                      position: thing.position,
                      type: thing.children[0].type,
                    });
                  } else {
                    let color = thing.material.color;

                    if (typeof color != 'object') {
                      console.log(color);
                    }

                    serialized.models.push({
                    uuid: Math.random(),
                    position: thing.position,
                    rotation: thing.rotation.toVector3(),
                    scale: thing.scale,
                    color: { r: color.r, g: color.g, b: color.b },
                    geometryType: thing.geometry.type,
                    name: thing.name,
                  });
                  }
                }

                setRedoList(JSON.stringify(serialized));

                const data = JSON.parse(statesList[statesList.length - 1]);
                popStatesList();
                setTargetMesh(null);
                setHoveredMesh(null);
                setLightWindowToggle(false); // Close light window
                setIsModelWindowOpen(false); // Close model window
                resetGroupList();
                replaceModelData(data.models);
                // replaceLightData(data.lights)
              }
            }
          
          break;

        case 's':
            
          serialize();
          break;

        // ctrl x deletes selected mesh
        case 'x':
          if (targetMesh != null && event.ctrlKey) {
            setHoveredMesh(null); // Remove hovered mesh to avoid bugs
            setTargetMesh(null); // Remove target mesh
            setLightWindowToggle(false); // Close light window
            setIsModelWindowOpen(false); // Close model window

            // save the modeldata
            serialize();

            const beforeLength = modelData.length; // Get modelData length
            deleteModelData(targetMesh); // Delete targeted mesh in modelData

            if (beforeLength === modelData.length) {
              // If nothing happened to modelList, a light must be deleted
              let lightIndex = -1; // Start at -1 to account for index starting at 0
              let totalLightsMinusOne = -1;

              groupList.forEach((entry) => {
                if (!(entry.uuid < 1)) {
                  // Mesh UUID is a decimal less than 1, Light UUID is not a decimal
                  totalLightsMinusOne++; // If light was found, increment the total amount of lights found

                  if (entry === targetMesh) {
                    // If groupList element is the targetMesh, save its index
                    lightIndex = totalLightsMinusOne;
                  }
                }
              });

              // Perform the delete function on the lightData list of lights - indexes of lightData list is reversed compared to groupList
              deleteLightData(totalLightsMinusOne - lightIndex);
            }

            // Delete the targeted mesh from the groupList
            delGroupList(targetMesh);
          }
          break;

        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return <>{children}</>;
}
