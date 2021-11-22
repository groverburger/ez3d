import create from 'zustand';

// Target State
export const useTarget = create((set) => ({
  targetMesh: null,
  setTargetMesh: (targetMesh) => set({ targetMesh }),

  hoveredMesh: null,
  setHoveredMesh: (hoveredMesh) => set({ hoveredMesh }),
}));

// Property States
export const useProperty = create((set) => ({
  currentColor: '#ffffff',
  setCurrentColor: (currentColor) => set({ currentColor }),

  currentShade: 'smooth',
  setCurrentShade: (currentShade) => set({ currentShade }),

  currentIntensity: 1,
  setCurrentIntensity: (currentIntensity) => set({ currentIntensity }),

  currentTransformMode: 'translate',
  setCurrentTransformMode: (currentTransformMode) =>
    set({ currentTransformMode }),

  currentTransform: {
    translate: {},
    rotate: {},
    scale: {},
  },
  setCurrentTransform: (currentTransform) =>
    set((state) => ({
      ...state.currentTransform,
      currentTransform,
    })),
}));

// Scene States
export const useScene = create((set) => ({
  isGridVisible: true,
  setGrid: (isGridVisible) => set({ isGridVisible }),

  isShadowsVisible: true,
  setShadows: (isShadowsVisible) => set({ isShadowsVisible }),

  isDragging: false,
  setIsDragging: (isDragging) => set({ isDragging }),
}));

// Model State
export const useModel = create((set) => ({
  modelData: [],

  modelDataPrev: [],

  isModelWindowOpen: false,
  setIsModelWindowOpen: (isModelWindowOpen) => set({ isModelWindowOpen }),

  replaceModelData: (data) => {
    set(() => ({
      modelData: data,
    }));
  },

  // function to delete model from modelData list
  // use the uuid of the input object to find the corresponding
  // model in modelData and delete it
  // the input object must be a groupList object
  deleteModelData: (delModel) =>
    set((state) => {
      var newList = state.modelData;
      state.modelData.forEach((entry, i) => {
        if (entry.attributes.uuid === delModel.uuid) {
          newList.splice(i, 1);
        }
      });
      state.modelData = newList;
    }),

    saveModelData: () =>{
        console.log("Saved Model Data")
        set((state) => {
            var newList = state.modelData;
            state.modelDataPrev = newList;
        })},

    undoModelData: () =>
        set((state) => {
            // state.modelData = [];
            var newList = state.modelDataPrev.slice();
            var oldList = state.modelData.slice();
            state.modelData = newList;
            state.modelDataPrev = oldList;
        }),

  setModelData: (modelDataElement) =>
    set((state) => ({
      modelData: [modelDataElement, ...state.modelData],
    })),
}));

// Light State
export const useLight = create((set) => ({
  lightData: [],
  lightDataPrev: [],
  setLightData: (lightDataElement) =>
    set((state) => ({
      lightData: [lightDataElement, ...state.lightData],
    })),

  lightWindowInfo: {
    lightType: null,
    isWindowOpen: false,
  },
  setLightWindowType: (windowInfoLightType) =>
    set((state) => {
      state.lightWindowInfo.lightType = windowInfoLightType;
    }),
  setLightWindowToggle: (windowInfoIsWindowOpen) =>
    set((state) => {
      state.lightWindowInfo.isWindowOpen = windowInfoIsWindowOpen;
    }),

  // function to delete light from lightData
  // use the uuid of the input object to find the corresponding
  // light in lightData and delete it
  // the input object must be a groupList object
  deleteLightData: (delIndex) =>
    set((state) => {
      var newList = state.lightData;
      newList.splice(delIndex, 1);
      state.lightData = newList;
    }),

    saveLightData: () =>{
        console.log("Saved Light Data")
        set((state) => {
            var newList = state.lightData.slice();
            state.lightDataPrev = newList;
    })},
    
    undoLightData: () =>
        set((state) => {
            // state.lightData = [];
            var newList = state.lightDataPrev.slice();
            var oldList = state.lightData.slice();
            state.lightData = newList;
            state.lightDataPrev = oldList;
    }),
}));

// Group State
export const useGroup = create((set) => ({
  groupList: [],
  groupListPrev: [],
  undoingMode: false,
  
  setUndoingMode: (undoingMode) =>
    set({ undoingMode }),

  // useGroup function to delete the specified object from the group list
  // input is a group object to delete
  // make a copy, delete from copy, set state to copy
  delGroupList: (delGroup) =>
    set((state) => {
      const index = state.groupList.indexOf(delGroup);
      var newList = state.groupList;
      newList.splice(index, 1);
      state.groupList = newList;
    }),
    
    saveGroupList: () =>{
        console.log("Saved GroupList")
        set((state) => {
            var newList = [...new Set([...state.groupList])];
            state.groupListPrev = newList;
            console.log("saved newList after undo: ", state.groupListPrev);
    })},
        
    undoGroupList: () =>{
        console.log("command z");
        set((state) => {
            // state.groupList = [];
            console.log("state of prevList before swap: ", state.groupListPrev);
            var newList = state.groupListPrev.map(a => {return {...a}});
            var oldList = state.groupList.map(a => {return {...a}});
            console.log("state of newList before swap: ", newList);
            state.groupList = newList;
            state.groupListPrev = oldList;
            console.log("state of grouplist after undo: ", state.groupList);
    })},

  setGroupList: (groupListElement) =>
    
    set((state) => ({
      groupList: [...new Set([...state.groupList, groupListElement])],
    })),   
    
}));
