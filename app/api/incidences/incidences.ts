import api from "@/config/axios.config";
import { UpsertIncidenceDto } from "@/app/dto/incidences/upsert-incidence.dto";
import { environment } from "@/environment/environment";

const apiUrl: string = `${environment.baseUrl}/incident`;

export async function upsertIncidenceDto(incidence: UpsertIncidenceDto) {
  return api.post(`${apiUrl}/upsert`, incidence);
}
