import { create } from "zustand";
import { GetStepDataDto } from "@/app/dto/instance/get-instance.dto";
import { InstanceStepDataDto } from "@/app/dto/instance/create-instance-stepdata.dto";

interface AppState {
  stepData: Record<number, Partial<GetStepDataDto>>;
  stepDataArray: Partial<InstanceStepDataDto>[];
  updateStepData: (stepId: number, data: Partial<GetStepDataDto>) => void;
  updateStepDataArray: (stepId: number, data: Partial<GetStepDataDto>) => void;
  clearStepData: () => void;
}

const useStore = create<AppState>((set) => ({
  stepData: {},
  stepDataArray: [],
  updateStepData: (stepId, data) =>
    set((state) => ({
      stepData: {
        ...state.stepData,
        [stepId]: {
          ...state.stepData[stepId],
          ...data,
        },
      },
    })),
  updateStepDataArray: (stepId, data) =>
    set((state) => {
      const existingIndex = state.stepDataArray.findIndex(
        (item) => item.stepId === stepId,
      );
      if (existingIndex !== -1) {
        const updatedArray = [...state.stepDataArray];
        updatedArray[existingIndex] = {
          ...updatedArray[existingIndex],
          ...data,
        };
        return { stepDataArray: updatedArray };
      } else {
        return { stepDataArray: [...state.stepDataArray, { stepId, ...data }] };
      }
    }),
  clearStepData: () => set({ stepData: {}, stepDataArray: [] }),
}));

export default useStore;
