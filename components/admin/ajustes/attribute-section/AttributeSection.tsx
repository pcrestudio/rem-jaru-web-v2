import useSWR from "swr";
import { FC } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

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

const AttributeSection: FC<AttributeSectionProps> = ({ moduleId }) => {
  const { data } = useSWR<GetSectionDto[]>(
    `${environment.baseUrl}/extended/sections?moduleId=${moduleId}`,
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
            itemClasses={{
              base: "mb-4",
              title: "text-cerulean-950 font-semibold text-base",
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
