export interface GetCejDossierDetailDto {
  idExpediente?: number;
  expedientePJ?: string;
  cuadernos?: number;
  actuaciones?: number;
  created_at?: Date;
  updated_at?: Date;
  juzgado?: string;
  partes?: string;
  message?: string;
  updated?: boolean;
  alternativeMessage?: string;
  activo?: string;
}
