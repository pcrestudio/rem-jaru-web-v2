import { create } from "zustand";

import { GetStepDataDto } from "@/app/dto/instance/get-instance.dto";
import { InstanceStepDataDto } from "@/app/dto/instance/create-instance-stepdata.dto";
import { GetTodosInstanceDto } from "@/app/dto/todos/get-todos-instance.dto";
import { FilterType } from "@/lib/types/filter.type";
import { IUser } from "@/app/admin/usuarios/interfaces";

interface AppState {
  stepData: Record<number, Partial<GetStepDataDto>>;
  stepDataArray: Partial<InstanceStepDataDto>[];
  stepTodos: Partial<GetTodosInstanceDto>[];
  user: Partial<IUser>;
  updateStepData: (stepId: number, data: Partial<GetStepDataDto>) => void;
  updateStepDataArray: (stepId: number, data: Partial<GetStepDataDto>) => void;
  clearStepData: () => void;
  updateStepTodos?: (
    title: string,
    stepId: number,
    entityStepReference: string,
    data: Partial<GetTodosInstanceDto>,
  ) => void;
  updateFilter?: (filter: FilterType) => void;
  updateUser?: (user: IUser) => void;
  clearFilter?: () => void;
  filter?: FilterType;
}

const useStore = create<AppState>((set) => ({
  stepData: {},
  stepDataArray: [],
  user: {},
  stepTodos: [],
  filter: {
    search: "",
    queryModule: "",
    queryPagination: "",
  },
  updateFilter: (filter: FilterType) => {
    set(() => ({
      filter,
    }));
  },
  updateUser: (user: IUser) => {
    set(() => ({
      user: user,
    }));
  },
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
  updateStepTodos: (title, stepDataId, entityStepReference, data) =>
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
            { stepDataId, entityStepReference, ...data },
          ],
        };
      }
    }),
  clearStepData: () => set({ stepData: {}, stepDataArray: [] }),
  clearFilter: () =>
    set({ filter: { search: "", queryModule: "", queryPagination: "" } }),
}));

export default useStore;
