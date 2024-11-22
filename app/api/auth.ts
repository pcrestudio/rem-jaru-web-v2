import { environment } from "@/environment/environment";
import axios from "axios";
import { UserAuthDto } from "@/app/dto/user-auth.dto";
import * as https from "https";

const apiUrl: string = environment.baseUrl;

const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // Disable SSL verification (development only)
});

export default async function auth(user: UserAuthDto) {
  return axios.post(`${apiUrl}/auth/token`, user, {
    httpsAgent,
  });
}
