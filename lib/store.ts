import { create } from "zustand";
import { GetStepDataDto } from "@/app/dto/instance/get-instance.dto";
import { InstanceStepDataDto } from "@/app/dto/instance/create-instance-stepdata.dto";
import { GetTodosInstanceDto } from "@/app/dto/todos/get-todos-instance.dto";

interface AppState {
  stepData: Record<number, Partial<GetStepDataDto>>;
  stepDataArray: Partial<InstanceStepDataDto>[];
  stepTodos: Partial<GetTodosInstanceDto>[];
  updateStepData: (stepId: number, data: Partial<GetStepDataDto>) => void;
  updateStepDataArray: (stepId: number, data: Partial<GetStepDataDto>) => void;
  clearStepData: () => void;
  updateStepTodos?: (
    title: string,
    stepId: number,
    entityReference: string,
    data: Partial<GetTodosInstanceDto>,
  ) => void;
}

const useStore = create<AppState>((set) => ({
  stepData: {},
  stepDataArray: [],
  stepTodos: [],
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
  updateStepTodos: (title, stepDataId, entityReference, data) =>
    set((state) => {
      const existingIndex = state.stepTodos.findIndex(
        (item) => item.title === title,
      );
      if (existingIndex !== -1) {
        const updatedArray = [...state.stepTodos];
        updatedArray[existingIndex] = {
          ...updatedArray[existingIndex],
          ...data,
        };
        return { stepTodos: updatedArray };
      } else {
        return {
          stepTodos: [
            ...state.stepTodos,
            { stepDataId, entityReference, ...data },
          ],
        };
      }
    }),
  clearStepData: () => set({ stepData: {}, stepDataArray: [] }),
}));

export default useStore;
