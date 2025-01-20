export interface UpsertIncidentDataDto {
  headquarters: string;
  comment: string;
  fileCode: string;
  instanceIncidentId: number;
  entityReference: string;
  id?: number;
}
