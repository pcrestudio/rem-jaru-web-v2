export interface UpsertInstanceStepDataDto {
  stepData: InstanceStepDataDto[];
}

export interface InstanceStepDataDto {
  comments: string;
  entityReference: string;
  stepId: number;
  id?: number;
}
