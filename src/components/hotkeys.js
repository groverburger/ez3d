import React, { useEffect } from 'react';
import { useGroup, useLight, useModel, useTarget } from './context';

export default function HotKeys({ children }) {
  const { setTargetMesh, targetMesh, setHoveredMesh } = useTarget();
  const { delGroupList, groupList } = useGroup();
  const { modelData, deleteModelData, setIsModelWindowOpen } = useModel();
  const { deleteLightData, lightData, setLightWindowToggle, setLightWindowType } = useLight();

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        // For debugging purposes
        case 'p':
          console.log('Currently Selected Mesh:', targetMesh);
          console.log('Grouplist:', groupList);
          console.log('LightData:', lightData);
          break;

        // Deselect target mesh
        case 'Escape':
          setTargetMesh(null);            // Remove target mesh
          setLightWindowType(null);       // Clear light window type
          setLightWindowToggle(false);    // Close light window
          setIsModelWindowOpen(false);    // Close model window
          break;

        // Delete selected mesh
        case 'x':
          setHoveredMesh(null);           // Remove hovered mesh to avoid bugs
          setTargetMesh(null);            // Remove target mesh
          setLightWindowToggle(false);    // Close light window
          setIsModelWindowOpen(false);    // Close model window

          const beforeLength = modelData.length;    // Get modelData length
          deleteModelData(targetMesh);              // Delete targeted mesh in modelData

          if (beforeLength === modelData.length) {  // If nothing happened to modelList, a light must be deleted
            var lightIndex = -1;                    // Start at -1 to account for index starting at 0
            var totalLightsMinusOne = -1;

            groupList.forEach((entry) => {
              if (!(entry.uuid < 1)) {    // Mesh UUID is a decimal less than 1, Light UUID is not a decimal
                totalLightsMinusOne++;    // If light was found, increment the total amount of lights found

                if (entry === targetMesh) {          // If groupList element is the targetMesh, save its index
                  lightIndex = totalLightsMinusOne;
                }
              }
            });

            // Perform the delete function on the lightData list of lights - indexes of lightData list is reversed compared to groupList
            deleteLightData(totalLightsMinusOne - lightIndex);
          }

          // Delete the targeted mesh from the groupList
          delGroupList(targetMesh);
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

  return (
    <>
      { children }
    </>
  );
}
