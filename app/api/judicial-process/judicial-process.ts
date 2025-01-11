import { environment } from "@/environment/environment";
import { mappingRevertSubmodules } from "@/config/mapping_submodules";
import { CreateJudicialProcessDto } from "@/app/dto/submodule/judicial_process/create-judicial-process.dto";
import api from "@/config/axios.config";
import { EditJudicialProcessDto } from "@/app/dto/submodule/judicial_process/edit-judicial-process.dto";
import { ToggleJudicialProcessDto } from "@/app/dto/submodule/judicial_process/toggle-judicial-process.dto";

const apiUrl: string = `${environment.baseUrl}/judicial_processes`;
const apiCEJUrl: string = `${environment.baseUrl}/cej`;

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
  const formData = new FormData();

  Object.entries(judicialProcess).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === "object" && !(value instanceof File)) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    }
  });

  return api.patch(
    `${apiUrl}/edit?slug=${mappingRevertSubmodules[slug]}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
}

export async function toggleJudicialProcess(
  judicialProcess: ToggleJudicialProcessDto,
) {
  return api.patch(`${apiUrl}/toggle`, judicialProcess);
}

export async function exportJudicialProcessExcel() {
  return api.get(`${apiUrl}/export/excel`, { responseType: "blob" });
}

export async function exportCEJDossier(fileName: string) {
  return api.get(`${apiCEJUrl}/export?fileName=${fileName}`, {
    responseType: "blob",
  });
}
