export interface UpsertInstanceStepDataDto {
  stepData: InstanceStepDataDto[];
}

export interface InstanceStepDataDto {
  comments: string;
  entityReference: string;
  file: any;
  todos: any;
  stepId: number;
  id?: number;
}
