import { create } from "zustand";

import { GetStepDataDto } from "@/app/dto/instance/get-instance.dto";
import { InstanceStepDataDto } from "@/app/dto/instance/create-instance-stepdata.dto";
import { GetTodosInstanceDto } from "@/app/dto/todos/get-todos-instance.dto";
import { FilterType } from "@/lib/types/filter.type";
import { IUser } from "@/app/admin/usuarios/interfaces";
import { GetInstanceIncidenceDataDto } from "@/app/dto/instance/get-instance-incidence-data.dto";
import format_date from "@/utils/format_date";

interface AppState {
  stepData: Record<number, Partial<GetStepDataDto>>;
  stepDataArray: Partial<InstanceStepDataDto>[];
  stepInstanceIncidenceData: Partial<GetInstanceIncidenceDataDto>[];
  stepTodos: Partial<GetTodosInstanceDto>[];
  user: Partial<IUser>;
  updateStepData: (stepId: number, data: Partial<GetStepDataDto>) => void;
  updateInstanceIncidenceData: (
    incidenceId: number,
    entityReference: string,
    data: Partial<GetInstanceIncidenceDataDto>,
  ) => void;
  updateStepDataArray: (
    stepId: number,
    data: Partial<GetStepDataDto>,
    entityId?: string,
  ) => void;
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
  stepInstanceIncidenceData: [],
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
    set((state) => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        state.user = JSON.parse(storedUser);
      }

      return {
        user,
      };
    });
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
  updateStepDataArray: (stepId, data, entityId) =>
    set((state) => {
      const existingIndex = state.stepDataArray.findIndex(
        (item) => item.stepId === stepId && item.entityId === entityId,
      );

      if (existingIndex !== -1) {
        const updatedArray = [...state.stepDataArray];

        updatedArray[existingIndex] = {
          ...updatedArray[existingIndex],
          ...data,
        };

        return { stepDataArray: updatedArray };
      } else {
        return {
          stepDataArray: [...state.stepDataArray, { stepId, ...data }],
        };
      }
    }),
  updateStepTodos: (title, stepDataId, entityStepReference, data) =>
    set((state) => {
      const existingIndex = state.stepTodos.findIndex(
        (item) => item.title === title,
      );

      const dateData: any = data.dateExpiration;

      if (existingIndex !== -1) {
        const updatedArray = [...state.stepTodos];

        updatedArray[existingIndex] = {
          ...updatedArray[existingIndex],
          ...data,
          dateExpiration: format_date(dateData.toDate()),
        };

        return { stepTodos: updatedArray };
      } else {
        return {
          stepTodos: [
            ...state.stepTodos,
            {
              stepDataId,
              entityStepReference,
              ...data,
              dateExpiration: format_date(dateData.toDate()),
            },
          ],
        };
      }
    }),
  updateInstanceIncidenceData: (instanceIncidentId, entityReference, data) =>
    set((state) => {
      const existingIndex = state.stepInstanceIncidenceData.findIndex(
        (item) => item.instanceIncidentId === instanceIncidentId,
      );

      if (existingIndex !== -1) {
        const updatedArray = [...state.stepInstanceIncidenceData];

        updatedArray[existingIndex] = {
          ...updatedArray[existingIndex],
          ...data,
        };

        return { stepInstanceIncidenceData: updatedArray };
      } else {
        return {
          stepInstanceIncidenceData: [
            ...state.stepInstanceIncidenceData,
            { instanceIncidentId, entityReference, ...data },
          ],
        };
      }
    }),
  clearStepData: () => set({ stepData: {}, stepDataArray: [] }),
  clearFilter: () =>
    set({ filter: { search: "", queryModule: "", queryPagination: "" } }),
}));

export default useStore;
