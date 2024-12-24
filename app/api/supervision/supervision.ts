import { environment } from "@/environment/environment";
import { mappingRevertSubmodules } from "@/config/mapping_submodules";
import api from "@/config/axios.config";
import { CreateSupervisionDto } from "@/app/dto/supervision/create-supervision.dto";

const apiUrl: string = `${environment.baseUrl}/supervisions`;

export async function createSupervision(
  supervisionDto: CreateSupervisionDto,
  slug: string,
) {
  return api.post(
    `${apiUrl}/create?slug=${mappingRevertSubmodules[slug]}`,
    supervisionDto,
  );
}
