"use client";

import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import MasterOptionDataGrid from "@/components/admin/ajustes/master-option-datagrid/MasterOptionDataGrid";
import format from "@/utils/format_date";
import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";
import { AiOutlinePlus } from "react-icons/ai";
import MasterModal from "@/app/admin/ajustes/maestros/components/master-modal/MasterModal";
import useMasterSettingHook from "@/app/admin/ajustes/maestros/hooks/useMasterSettingHook";

export default function Maestros() {
  const {
    handleMasterSubmit,
    openMaster,
    groupedData,
    handleMasterModalChange,
    handleCloseMasterModal,
    handleOpenSettingSectionModal,
    isSettingSection,
    pathname,
  } = useMasterSettingHook();

  return (
    <>
      <MasterModal
        title={isSettingSection ? "Nueva sección" : "Nuevo maestro"}
        isOpen={openMaster}
        handleSubmit={handleMasterSubmit}
        onCloseChange={handleCloseMasterModal}
        isSettingSection={isSettingSection}
      />

      <div className="flex flex-col gap-6">
        <BreadcrumbsPath pathname={pathname} />

        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-cerulean-950">
              Define los cimientos de tu sistema.
            </h1>
            <p className="text-base text-slate-700 max-w-[70%]">
              Administra todo tipo de configuraciones esenciales para
              personalizar y potenciar la eficiencia de tu plataforma.
            </p>
          </div>

          <Button
            className="standard-btn w-auto text-white"
            endContent={<AiOutlinePlus />}
            onClick={handleOpenSettingSectionModal}
          >
            Agregar sección
          </Button>
        </div>

        {groupedData.length > 0 &&
          groupedData.map(([moduleName, masters]) => (
            <Accordion
              key={moduleName}
              selectionMode="multiple"
              variant="splitted"
              className="master-global-accordion"
              itemClasses={{
                base: "-p-0",
                title: "master-title text-cerulean-950 font-bold text-lg",
                content: "master-accordion",
                trigger: "border-b-red-500",
              }}
            >
              <AccordionItem title={moduleName}>
                <>
                  {masters.map((master) => (
                    <Accordion
                      key={master.name}
                      variant="splitted"
                      className="master-option-global-accordion"
                      itemClasses={{
                        title:
                          "master-option-title text-cerulean-950 font-bold text-base",
                        base: "mb-4",
                        trigger: "![&>span]:rotate-0",
                      }}
                    >
                      <AccordionItem
                        title={master.name}
                        subtitle={`Creado: ${format(master.createdAt)}`}
                        className="border border-slate-200 shadow-none"
                      >
                        <MasterOptionDataGrid masterId={master.id} />
                      </AccordionItem>
                    </Accordion>
                  ))}
                  <div className="flex flex-row justify-end border border-b-0 border-l-0 border-r-0 border-t-gray-200 p-3">
                    <Button
                      className="standard-btn w-auto text-white"
                      onClick={() =>
                        handleMasterModalChange(masters, moduleName)
                      }
                      endContent={<AiOutlinePlus />}
                    >
                      Agregar maestro
                    </Button>
                  </div>
                </>
              </AccordionItem>
            </Accordion>
          ))}
      </div>
    </>
  );
}
