import { useState } from "react";
import { GetSectionAttributesDto } from "@/app/dto/attribute-values/get-section-attributes.dto";
import { GetSectionAttributeOptionDto } from "@/app/dto/attribute-values/get-section-attribute-option.dto";
import { CreateSectionAttributeOptionDto } from "@/app/dto/attribute-values/create-section-attribute-option.dto";
import {
  createSectionAttribute,
  createSectionAttributeOption,
  editSectionAttribute,
  editSectionAttributeOption,
} from "@/app/api/attribute-values/atrribute-values";
import { CreateSectionAttributeDto } from "@/app/dto/attribute-values/create-section-attribute.dto";

interface UseSectionAttributeProps {
  isOpenSectionAttributeModal: boolean;
  isOpen: boolean;
  attribute: GetSectionAttributesDto | null;
  sectionId: number;
  attributeOption: GetSectionAttributeOptionDto | null;
  selectedAttribute: (sectionAttribute: GetSectionAttributesDto) => void;
  selectedAttributeOption: (option: GetSectionAttributeOptionDto) => void;
  onSectionAttributeModalOpenChange: (sectionId?: number) => void;
  onSectionAttributeModalClose: () => void;
  onSectionAttributeOptionModalOpenChange: () => void;
  onSectionAttributeOptionModalClose: () => void;
  selectedModalConfigureOption: (
    sectionAttribute: GetSectionAttributesDto,
  ) => void;
  handleSubmit: (
    payload: CreateSectionAttributeOptionDto,
    reset: () => void,
  ) => void;
  handleAttributeSubmit: (
    payload: CreateSectionAttributeDto,
    reset: () => void,
  ) => void;
}

const useSectionAttribute = (): UseSectionAttributeProps => {
  const initialValues: GetSectionAttributeOptionDto = {
    optionValue: "",
    optionLabel: "",
    attributeId: 0,
    sectionAttributeOptionId: 0,
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sectionId, setSectionId] = useState<number>(0);
  const [isOpenSectionAttributeModal, setOpenSectionAttributeModal] =
    useState<boolean>(false);
  const [attribute, setAttribute] = useState<GetSectionAttributesDto | null>(
    null,
  );
  const [attributeOption, setAttributeOption] =
    useState<GetSectionAttributeOptionDto | null>(initialValues);
  const selectedModalConfigureOption = (
    sectionAttribute: GetSectionAttributesDto,
  ) => {
    setAttribute(sectionAttribute);
    setIsOpen(true);
  };
  const selectedAttribute = (sectionAttribute: GetSectionAttributesDto) => {
    setAttribute(sectionAttribute);
    setOpenSectionAttributeModal(true);
  };
  const selectedAttributeOption = (option: GetSectionAttributeOptionDto) => {
    setAttributeOption(option);
  };

  const handleSubmit = async (
    payload: CreateSectionAttributeOptionDto,
    reset: () => void,
  ) => {
    if (attributeOption) {
      const { data } = await editSectionAttributeOption({
        ...payload,
        attributeId: Number(payload.attributeId),
      });

      if (data) {
        setAttributeOption(initialValues);
        return reset();
      }
    }

    const { data } = await createSectionAttributeOption({
      ...payload,
      attributeId: Number(payload.attributeId),
    });

    if (data) {
      setAttributeOption(initialValues);
      return reset();
    }
  };

  const handleAttributeSubmit = async (
    payload: CreateSectionAttributeDto,
    reset: () => void,
  ) => {
    if (attribute) {
      delete payload["options"];

      const { data } = await editSectionAttribute({
        ...payload,
        sectionAttributeId: Number(payload.sectionAttributeId),
        sectionId: Number(payload.sectionId),
        order: Number(payload.order),
      });

      if (data) {
        setAttributeOption(initialValues);
        setOpenSectionAttributeModal(false);
        return reset();
      }
    }

    const { data } = await createSectionAttribute({
      ...payload,
      sectionId: Number(payload.sectionId),
      order: Number(payload.order),
    });

    if (data) {
      setAttributeOption(initialValues);
      setOpenSectionAttributeModal(false);
      return reset();
    }
  };

  const onSectionAttributeModalOpenChange = (sectionId: number) => {
    setOpenSectionAttributeModal(true);
    setSectionId(sectionId);
  };

  const onSectionAttributeOptionModalOpenChange = () => setIsOpen(true);

  const onSectionAttributeModalClose = () => {
    setOpenSectionAttributeModal(false);
    setAttribute(null);
  };

  const onSectionAttributeOptionModalClose = () => {
    setIsOpen(false);
    setAttribute(null);
    setAttributeOption(initialValues);
  };

  return {
    isOpen,
    isOpenSectionAttributeModal,
    attribute,
    attributeOption,
    handleSubmit,
    handleAttributeSubmit,
    selectedAttribute,
    selectedAttributeOption,
    selectedModalConfigureOption,
    onSectionAttributeModalOpenChange,
    onSectionAttributeModalClose,
    onSectionAttributeOptionModalClose,
    onSectionAttributeOptionModalOpenChange,
    sectionId,
  };
};

export default useSectionAttribute;