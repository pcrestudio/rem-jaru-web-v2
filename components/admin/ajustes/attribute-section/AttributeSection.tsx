import useSWR from "swr";
import { FC } from "react";
import { Accordion, AccordionItem } from "@heroui/react";

import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetSectionDto } from "@/app/dto/attribute-values/get-section.dto";
import SectionAttributesDataGrid from "@/components/admin/ajustes/section-attributes-datagrid/SectionAttributesDataGrid";
import SectionAttributeOptionModal from "@/components/admin/ajustes/section-attribute-option-modal/SectionAttributeOptionModal";
import SectionAttributeModal from "@/components/admin/ajustes/section-attribute-modal/SectionAttributeModal";
import useSectionAttribute from "@/hooks/useSectionAttribute";

interface AttributeSectionProps {
  moduleId?: number;
  submoduleId?: number;
}

const AttributeSection: FC<AttributeSectionProps> = ({
  moduleId,
  submoduleId,
}) => {
  const { data } = useSWR<GetSectionDto[]>(
    `${environment.baseUrl}/extended/sections?moduleId=${moduleId}&submoduleId=${submoduleId}`,
    fetcher,
  );
  const {
    isOpen,
    isOpenSectionAttributeModal,
    handleAttributeOptionSubmit,
    handleAttributeSubmit,
    attribute,
    attributeOption,
    selectedAttribute,
    selectedAttributeOption,
    selectedModalConfigureOption,
    onSectionAttributeModalOpenChange,
    onSectionAttributeModalClose,
    onSectionAttributeOptionModalOpenChange,
    onSectionAttributeOptionModalClose,
    sectionId,
  } = useSectionAttribute();

  return (
    <>
      {isOpen && (
        <SectionAttributeOptionModal
          attributeId={
            attribute?.sectionAttributeId ?? attribute?.globalAttributeId
          }
          attributeOption={attributeOption}
          handleSubmit={handleAttributeOptionSubmit}
          isOpen={isOpen}
          optionType={!attribute?.sectionAttributeId ? "global" : "section"}
          selectedConfigureOption={selectedAttributeOption}
          title={`Configurar opciones`}
          onCloseChange={onSectionAttributeOptionModalClose}
          onOpenChange={onSectionAttributeOptionModalOpenChange}
        />
      )}
      <SectionAttributeModal
        attribute={attribute}
        handleSubmit={handleAttributeSubmit}
        isOpen={isOpenSectionAttributeModal}
        sectionId={sectionId}
        title={attribute ? "Editar atributo" : `Agregar atributo`}
        onCloseChange={onSectionAttributeModalClose}
        onOpenChange={onSectionAttributeModalOpenChange}
      />
      {data &&
        data.map((section) => (
          <Accordion
            key={`${section.label}`}
            className="master-option-global-accordion"
            itemClasses={{
              title:
                "master-option-title text-cerulean-950 font-bold text-base",
              base: "mb-4",
              trigger: "![&>span]:rotate-0",
            }}
            selectionMode="multiple"
            variant="splitted"
          >
            <AccordionItem
              key={section.sectionId}
              aria-label={`Accordion ${section.sectionId}`}
              className="border border-slate-200 shadow-none"
              title={`${section.label}`}
            >
              <SectionAttributesDataGrid
                attributes={section.attributes}
                sectionId={section.sectionId}
                selectedAttribute={selectedAttribute}
                selectedConfigureOption={selectedModalConfigureOption}
                onSectionAttributeModalOpenChange={() =>
                  onSectionAttributeModalOpenChange(section.sectionId)
                }
              />
            </AccordionItem>
          </Accordion>
        ))}
    </>
  );
};

export default AttributeSection;
