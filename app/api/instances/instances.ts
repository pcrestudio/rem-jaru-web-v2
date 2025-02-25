import api from "@/config/axios.config";
import { environment } from "@/environment/environment";
import {
  InstanceStepDataDto,
  UpsertInstanceStepDataDto,
} from "@/app/dto/instance/create-instance-stepdata.dto";
import { UpsertIncidentDataDto } from "@/app/dto/instance/upsert-incident-data.dto";
import { UpsertInstanceStepDto } from "@/app/dto/instance/upsert-instance.dto";

const apiUrl: string = `${environment.baseUrl}/instance`;
const apiIncidentUrl: string = `${environment.baseUrl}/incident`;

export async function upsertInstanceStepData(
  instanceStepData: UpsertInstanceStepDataDto,
) {
  const filteredData: InstanceStepDataDto[] = instanceStepData.stepData.filter(
    (item) => {
      const keys = Object.keys(item);

      return (
        keys.length > 2 ||
        !keys.every((key) => key === "stepId" || key === "entityReference")
      );
    },
  );

  const formData = new FormData();

  filteredData.forEach((stepData, index) => {
    formData.append(`stepData[${index}][stepId]`, stepData.stepId.toString());
    formData.append(`stepData[${index}][comments]`, stepData.comments || "");
    formData.append(`stepData[${index}][choice]`, stepData.choice || "");
    formData.append(`stepData[${index}][resume]`, stepData.resume || "");
    formData.append(`stepData[${index}][title]`, stepData.title || "");
    formData.append(
      `stepData[${index}][dateResume]`,
      JSON.stringify(stepData.dateResume) || "",
    );
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

    if (stepData.fileTwo && typeof stepData.fileTwo !== "string") {
      formData.append(`stepData[${index}][fileTwo]`, stepData.fileTwo);
    }

    if (stepData.fileThree && typeof stepData.fileThree !== "string") {
      formData.append(`stepData[${index}][fileThree]`, stepData.fileThree);
    }

    if (stepData.fileFour && typeof stepData.fileFour !== "string") {
      formData.append(`stepData[${index}][file]`, stepData.fileFour);
    }

    if (stepData.fileFive && typeof stepData.fileFive !== "string") {
      formData.append(`stepData[${index}][fileFive]`, stepData.fileFive);
    }

    if (stepData.todos && stepData.todos.length > 0) {
      formData.append(
        `stepData[${index}][todos]`,
        JSON.stringify(stepData.todos),
      );
    }
  });

  formData.append("modelType", instanceStepData.modelType);

  return api.post(`${apiUrl}/upsert/step/record`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function upsertIncidentData(incidents: UpsertIncidentDataDto[]) {
  return api.post(`${apiIncidentUrl}/upsert/incidentData`, incidents);
}

export async function upsertInstanceStep(instanceStep: UpsertInstanceStepDto) {
  return api.post(`${apiUrl}/upsert/step`, instanceStep);
}

export async function deleteInstanceStep(instanceStep: UpsertInstanceStepDto) {
  return api.delete(`${apiUrl}/${instanceStep.id}`);
}

export async function exportDocument(fileName: string) {
  return api.get(`${apiUrl}/export?fileName=${fileName}`, {
    responseType: "blob",
  });
}
