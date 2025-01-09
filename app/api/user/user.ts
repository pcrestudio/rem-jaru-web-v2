import { environment } from "@/environment/environment";
import api from "@/config/axios.config";
import { UpsertUserDto } from "@/app/dto/user/user-register.dto";

const apiUrl: string = `${environment.baseUrl}/users`;

export async function upsertUser(user: UpsertUserDto) {
  return api.post(`${apiUrl}/register`, user);
}
