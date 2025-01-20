import { GetInstanceIncidenceDataDto } from "@/app/dto/instance/get-instance-incidence-data.dto";

export interface GetInstanceIncidenceDto {
  name: string;
  instanceId: number;
  instanceIncidenceData: GetInstanceIncidenceDataDto[];
  //Id de la incidencia
  id: number;
}
