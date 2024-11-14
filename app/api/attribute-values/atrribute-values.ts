import { environment } from "@/environment/environment";

import api from "@/config/axios.config";
import { CreateSectionAttributeOptionDto } from "@/app/dto/attribute-values/create-section-attribute-option.dto";
import { CreateSectionAttributeDto } from "@/app/dto/attribute-values/create-section-attribute.dto";
import {
  CreateSectionAttributeValueDto,
  CreateSectionAttributeValueGroup,
} from "@/app/dto/attribute-values/create-section-attribute-value.dto";

const apiUrl: string = `${environment.baseUrl}/extended`;

export async function createSectionAttribute(
  sectionAttribute: CreateSectionAttributeDto,
) {
  return api.post(`${apiUrl}/section/attribute`, sectionAttribute);
}

export async function editSectionAttribute(
  sectionAttribute: CreateSectionAttributeDto,
) {
  return api.patch(`${apiUrl}/section/attribute`, sectionAttribute);
}

export async function createSectionAttributeOption(
  sectionAttributeOption: CreateSectionAttributeOptionDto,
) {
  return api.post(`${apiUrl}/section/attribute/option`, sectionAttributeOption);
}

export async function editSectionAttributeOption(
  sectionAttributeOption: CreateSectionAttributeOptionDto,
) {
  return api.patch(
    `${apiUrl}/section/attribute/option`,
    sectionAttributeOption,
  );
}

export async function createSectionAttributeValue(
  sectionAttributeValue: CreateSectionAttributeValueGroup,
) {
  return api.post(`${apiUrl}/attribute/values`, sectionAttributeValue);
}

export async function editSectionAttributeValue(
  sectionAttributeValue: CreateSectionAttributeValueGroup,
) {
  return api.patch(`${apiUrl}/attribute/values/edit`, sectionAttributeValue);
}
