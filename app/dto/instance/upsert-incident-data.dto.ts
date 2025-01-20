export interface UpsertIncidentDataDto {
  headquarters: string;
  comment: string;
  fileCode: string;
  instanceIncidentId: number;
  id?: number;
}
