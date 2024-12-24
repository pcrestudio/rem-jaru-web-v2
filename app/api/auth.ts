import * as https from "https";

import axios from "axios";

import { environment } from "@/environment/environment";
import { UserAuthDto } from "@/app/dto/user-auth.dto";

const apiUrl: string = environment.baseUrl;

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export default async function auth(user: UserAuthDto) {
  return axios.post(`${apiUrl}/auth/token`, user, {
    httpsAgent,
  });
}
