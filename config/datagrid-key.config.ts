import { ExtendedAttributeConfig } from "@/config/extended-attribute.config";

export enum DataGridKey {
  connectLegal = "connectLegal",
  sede = "sede",
  cause = "cause",
  startDate = "startDate",
  resume = "resume",
  lastSituation = "lastSituation",
  nextSituation = "nextSituation",
  contingencyPercentage = ExtendedAttributeConfig.contingencyPercentage,
  contingencyLevel = ExtendedAttributeConfig.contingencyLevel,
  provisionContingency = ExtendedAttributeConfig.provisionContingency,
  provisionAmount = ExtendedAttributeConfig.provisionAmount,
  risks = "risks",
  saving = "saving",
  criticalProcess = "criticalProcess",
  principalLawyer = "principalLawyer",
  lawyerEmail = "lawyerEmail",
  internalSpecialist = "internalSpecialist",
}
