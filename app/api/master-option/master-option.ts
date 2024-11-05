import { environment } from "@/environment/environment";
import api from "@/config/axios.config";
import { CreateMasterOptionDto } from "@/app/dto/masters/create-master-option.dto";

const apiUrl: string = `${environment.baseUrl}/masters`;

export async function createMasterOption(masterOption: CreateMasterOptionDto) {
  return api.post(`${apiUrl}/create/option`, masterOption);
}

export async function editMasterOption(masterOption: CreateMasterOptionDto) {
  return api.patch(`${apiUrl}/edit/option`, masterOption);
}
