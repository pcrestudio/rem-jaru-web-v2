import { environment } from "@/environment/environment";
import api from "@/config/axios.config";
import { CreateMasterOptionDto } from "@/app/dto/masters/create-master-option.dto";
import { ToggleMasterOptionDto } from "@/app/dto/masters/toggle-master-option.dto";
import { UpsertMasterDto } from "@/app/dto/masters/upsert-master.dto";

const apiUrl: string = `${environment.baseUrl}/masters`;

export async function upsertMaster(master: UpsertMasterDto) {
  return api.post(`${apiUrl}/upsert`, master);
}

export async function createMasterOption(masterOption: CreateMasterOptionDto) {
  return api.post(`${apiUrl}/create/option`, masterOption);
}

export async function editMasterOption(masterOption: CreateMasterOptionDto) {
  return api.patch(`${apiUrl}/edit/option`, masterOption);
}

export async function toggleMasterOption(masterOption: ToggleMasterOptionDto) {
  return api.patch(`${apiUrl}/toggle/option`, masterOption);
}
