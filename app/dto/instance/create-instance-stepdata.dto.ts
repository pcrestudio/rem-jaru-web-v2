export interface UpsertInstanceStepDataDto {
  stepData: InstanceStepDataDto[];
  modelType?: string;
  isInstance?: boolean;
  incidenceId?: number;
}

export interface InstanceStepDataDto {
  comments: string;
  entityReference: string;
  file: any;
  fileTwo: any;
  fileThree: any;
  fileFour: any;
  fileFive: any;
  todos: any;
  stepId: number;
  dateResume?: object;
  entityId?: string;
  resume?: string;
  title?: string;
  choice?: string;
  incidenceId?: number;
  id?: number;
}
