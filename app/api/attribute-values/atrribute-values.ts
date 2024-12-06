import { environment } from "@/environment/environment";

import api from "@/config/axios.config";
import { CreateSectionAttributeOptionDto } from "@/app/dto/attribute-values/create-section-attribute-option.dto";
import { CreateSectionAttributeDto } from "@/app/dto/attribute-values/create-section-attribute.dto";
import { CreateSectionAttributeValueGroup } from "@/app/dto/attribute-values/create-section-attribute-value.dto";
import { CreateAttributeRuleDto } from "@/app/dto/attribute-values/create-attribute-rule.dto";
import { DataType } from "@/app/dto/attribute-values/get-section-attributes.dto";

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
  const formData = new FormData();

  formData.append(
    "attributes",
    JSON.stringify(sectionAttributeValue.attributes),
  );

  sectionAttributeValue.attributes.forEach((item: any) => {
    if (item.type === "FILE" && item.value instanceof File) {
      formData.append(item.attributeSlug, item.value);
    } else {
      formData.append(item.attributeSlug, item.value);
    }
  });

  formData.append("entityReference", sectionAttributeValue.entityReference);

  return api.post(`${apiUrl}/attribute/values`, formData, {
    headers: {
      contentType: "multipart/form-data",
    },
  });
}

export async function upsertAttributeRule(
  attributeRule: CreateAttributeRuleDto,
) {
  return api.post(`${apiUrl}/attribute/rule`, attributeRule);
}
