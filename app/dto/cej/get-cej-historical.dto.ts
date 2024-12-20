export interface GetCEJHistoricalDto {
  id: number;
  idExpediente: number;
  idActuacion: string;
  fecha: Date;
  resolucion: string;
  tiponotificacion: string;
  acto: string;
  fojas: string;
  proveido: string;
  sumilla: string;
  descripcion_usr: string;
  resolucion_archivo: null;
  created_at: Date;
  updated_at: Date;
  idProcesoUltimo: number;
}
