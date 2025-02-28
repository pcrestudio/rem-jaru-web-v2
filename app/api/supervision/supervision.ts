import { environment } from "@/environment/environment";
import { mappingRevertSubmodules } from "@/config/mapping_submodules";
import api from "@/config/axios.config";
import { CreateSupervisionDto } from "@/app/dto/supervision/create-supervision.dto";
import { EditSupervisionDto } from "@/app/dto/supervision/edit-supervision.dto";
import { ToggleJudicialProcessDto } from "@/app/admin/procesos-judiciales/types/toggle-judicial-process.dto";

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

export async function editSupervision(
  supervision: EditSupervisionDto,
  slug: string,
) {
  const formData = new FormData();

  Object.entries(supervision).forEach(([key, value]) => {
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

export async function exportSupervisionWord(entityReference: string) {
  return api.get(`${apiUrl}/export/word?entityReference=${entityReference}`, {
    responseType: "arraybuffer",
  });
}

export async function exportSupervisionExcel() {
  return api.get(`${apiUrl}/export/excel`, { responseType: "blob" });
}

export async function toggleSupervision(supervision: ToggleJudicialProcessDto) {
  return api.patch(`${apiUrl}/toggle`, supervision);
}
