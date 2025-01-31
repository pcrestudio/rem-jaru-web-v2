import { environment } from "@/environment/environment";

import api from "@/config/axios.config";
import { UpsertReclaimDto } from "@/app/dto/reclaims/upsert-reclaim.dto";

const apiUrl: string = `${environment.baseUrl}/reclaims`;

export async function upsertReclaims(
  reclaims: UpsertReclaimDto[],
  entityReference: string,
  modelType: string,
) {
  return api.post(
    `${apiUrl}/upsert?entityReference=${entityReference}&modelType=${modelType}`,
    reclaims,
  );
}
