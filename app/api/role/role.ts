import api from "@/config/axios.config";
import { environment } from "@/environment/environment";
import { UpsertRoleDto } from "@/app/dto/role/upsert-role.dto";

const apiUrl: string = `${environment.baseUrl}/roles`;

export async function upsertRole(role: UpsertRoleDto) {
  return api.post(`${apiUrl}/upsert`, role);
}
