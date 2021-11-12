import create from 'zustand';

// Target State
export const useTarget = create((set) => ({
  targetMesh: null,
  setTargetMesh: (targetMesh) => set({ targetMesh }),
}));

// Grid State
export const useGrid = create((set) => ({
  isGridVisible: true,
  setGrid: (isGridVisible) => set({ isGridVisible }),
}));

// Color State
export const useColor = create((set) => ({
  currentColor: '#ffffff',
  setCurrentColor: (currentColor) => set({ currentColor }),
}));

// Shader State
export const useShader = create((set) => ({
  currentShade: 'smooth',
  setCurrentShade: (currentShade) => set({ currentShade }),
}));

// Transform Controls State
export const useTransform = create((set) => ({
  transformType: null,
  setTransformType: (transformType) => set({ transformType }),
}));

// Model State
export const useModel = create((set) => ({
  modelData: [],
  setModelData: (modelData) =>
    set((state) => ({
      modelData: [modelData, ...state.modelData],
    })),
}));

// Light State
export const useLight = create((set) => ({
  lightData: [],
  setLightData: (lightData) =>
    set((state) => ({
      lightData: [lightData, ...state.lightData],
    })),

  intensity: 1,
  setIntensity: (intensity) => set({ intensity }),

  windowInfo: {
    lightType: null,
    isWindowOpen: false,
  },
  setWindowType: (windowInfo) =>
    set((state) => {
      state.windowInfo.lightType = windowInfo;
    }),
  setWindowToggle: (windowInfo) =>
    set((state) => {
      state.windowInfo.isWindowOpen = windowInfo;
    }),
}));

// Group State
export const useGroup = create((set) => ({
  groupList: [],
  setGroupList: (groupList) =>
    set((state) => ({
      groupList: [...new Set([...state.groupList, groupList])],
    })),
}));
