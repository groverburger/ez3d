import create from 'zustand';

export const useGrid = create((set) => ({
  isGridVisible: true,
  setGrid: (isGridVisible) => set({ isGridVisible }),
}));

export const useTransform = create((set) => ({
  targetToTransform: null,
  setTargetToTransform: (targetToTransform) => set({ targetToTransform }),

  transformType: null,
  setTransformType: (transformType) => set({ transformType }),
}));

export const useModel = create((set) => ({
  modelList: [],
  setModelList: (modelList) =>
    set((state) => ({
      modelList: [modelList, ...state.modelList],
    })),
}));

export const useLight = create((set) => ({
  targetLight: null,
  setTargetLight: (targetLight) => set({ targetLight }),

  lightList: [],
  setLightList: (lightList) =>
    set((state) => ({
      lightList: [lightList, ...state.lightList],
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
