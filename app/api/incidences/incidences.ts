import api from "@/config/axios.config";
import { UpsertIncidenceDto } from "@/app/dto/incidences/upsert-incidence.dto";
import { environment } from "@/environment/environment";
import { UpsertIncidenceDataDto } from "@/app/dto/incidences/upsert-incidence-data.dto";

const apiUrl: string = `${environment.baseUrl}/incident`;

export async function upsertIncidenceDto(incidence: UpsertIncidenceDto) {
  return api.post(`${apiUrl}/upsert`, incidence);
}

export async function upsertIncidenceDataDto(
  incidenceData: UpsertIncidenceDataDto,
) {
  return api.post(`${apiUrl}/upsert/data`, incidenceData);
}

export async function deleteIncidence(id: string) {
  return api.delete(`${apiUrl}/${id}`);
}
