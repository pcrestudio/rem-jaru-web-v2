import { environment } from "@/environment/environment";
import axios from "axios";
import { UserAuthDto } from "@/app/dto/user-auth.dto";

const apiUrl: string = environment.baseUrl;

export default async function auth(user: UserAuthDto) {
  return axios.post(`${apiUrl}/auth/token`, user);
}
