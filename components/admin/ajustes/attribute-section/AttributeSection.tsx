import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { FC } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
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
          isOpen={isOpen}
          onOpenChange={onSectionAttributeOptionModalOpenChange}
          onCloseChange={onSectionAttributeOptionModalClose}
          title={`Configurar opciones`}
          handleSubmit={handleAttributeOptionSubmit}
          attributeId={
            attribute?.sectionAttributeId ?? attribute?.globalAttributeId
          }
          selectedConfigureOption={selectedAttributeOption}
          attributeOption={attributeOption}
        />
      )}
      <SectionAttributeModal
        isOpen={isOpenSectionAttributeModal}
        onOpenChange={onSectionAttributeModalOpenChange}
        onCloseChange={onSectionAttributeModalClose}
        title={attribute ? "Editar atributo" : `Agregar atributo`}
        handleSubmit={handleAttributeSubmit}
        attribute={attribute}
        sectionId={sectionId}
      />
      {data &&
        data.map((section) => (
          <Accordion
            selectionMode="multiple"
            variant="splitted"
            key={`${section.label}`}
            itemClasses={{
              base: "mb-4",
              title: "text-cerulean-950 font-semibold text-base",
            }}
          >
            <AccordionItem
              key={section.sectionId}
              aria-label={`Accordion ${section.sectionId}`}
              title={`${section.label}`}
              className="border border-slate-200 shadow-none"
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
