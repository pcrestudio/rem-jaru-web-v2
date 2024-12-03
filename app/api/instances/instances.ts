import api from "@/config/axios.config";
import { environment } from "@/environment/environment";
import { UpsertInstanceStepDataDto } from "@/app/dto/instance/create-instance-stepdata.dto";

const apiUrl: string = `${environment.baseUrl}/instance`;

export async function upsertInstanceStepData(
  instanceStepData: UpsertInstanceStepDataDto,
) {
  return api.post(`${apiUrl}/upsert/step/record`, instanceStepData);
}
