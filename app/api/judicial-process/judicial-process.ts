import { environment } from "@/environment/environment";

import { mappingRevertSubmodules } from "@/config/mapping_submodules";
import { CreateJudicialProcessDto } from "@/app/dto/submodule/judicial_process/create-judicial-process.dto";
import api from "@/config/axios.config";
import { EditJudicialProcessDto } from "@/app/dto/submodule/judicial_process/edit-judicial-process.dto";
import { ToggleJudicialProcessDto } from "@/app/dto/submodule/judicial_process/toggle-judicial-process.dto";

const apiUrl: string = `${environment.baseUrl}/judicial_processes`;

export async function createJudicialProcess(
  judicialProcess: CreateJudicialProcessDto,
  slug: string,
) {
  return api.post(
    `${apiUrl}/create?slug=${mappingRevertSubmodules[slug]}`,
    judicialProcess,
  );
}

export async function editJudicialProcess(
  judicialProcess: EditJudicialProcessDto,
  slug: string,
) {
  return api.patch(
    `${apiUrl}/edit?slug=${mappingRevertSubmodules[slug]}`,
    judicialProcess,
  );
}

export async function toggleJudicialProcess(
  judicialProcess: ToggleJudicialProcessDto,
) {
  return api.patch(`${apiUrl}/toggle`, judicialProcess);
}
