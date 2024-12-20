import api from "@/config/axios.config";
import { environment } from "@/environment/environment";
import { UpsertInstanceStepDataDto } from "@/app/dto/instance/create-instance-stepdata.dto";

const apiUrl: string = `${environment.baseUrl}/instance`;

export async function upsertInstanceStepData(
  instanceStepData: UpsertInstanceStepDataDto,
) {
  const formData = new FormData();

  instanceStepData.stepData.forEach((stepData, index) => {
    formData.append(`stepData[${index}][stepId]`, stepData.stepId.toString());
    formData.append(`stepData[${index}][comments]`, stepData.comments || "");
    formData.append(
      `stepData[${index}][entityReference]`,
      stepData.entityReference,
    );
    if (stepData.id !== undefined) {
      formData.append(`stepData[${index}][id]`, stepData.id.toString());
    }

    if (stepData.file && typeof stepData.file !== "string") {
      formData.append(`stepData[${index}][file]`, stepData.file);
    }

    if (stepData.todos && stepData.todos.length > 0) {
      formData.append(
        `stepData[${index}][todos]`,
        JSON.stringify(stepData.todos),
      );
    }
  });

  return api.post(`${apiUrl}/upsert/step/record`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function exportDocument(fileName: string) {
  return api.get(`${apiUrl}/export?fileName=${fileName}`, {
    responseType: "blob",
  });
}
