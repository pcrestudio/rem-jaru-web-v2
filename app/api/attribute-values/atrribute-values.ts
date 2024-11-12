import { environment } from "@/environment/environment";

import api from "@/config/axios.config";
import { CreateSectionAttributeOptionDto } from "@/app/dto/attribute-values/create-section-attribute-option.dto";

const apiUrl: string = `${environment.baseUrl}/attribute-values`;

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
