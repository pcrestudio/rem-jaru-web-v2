"use client";

import { Accordion, AccordionItem, Button } from "@heroui/react";
import { AiOutlinePlus } from "react-icons/ai";

import MasterOptionDataGrid from "@/components/admin/ajustes/master-option-datagrid/MasterOptionDataGrid";
import format from "@/utils/format_date";
import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";
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
        handleSubmit={handleMasterSubmit}
        isOpen={openMaster}
        isSettingSection={isSettingSection}
        title={isSettingSection ? "Nueva sección" : "Nuevo maestro"}
        onCloseChange={handleCloseMasterModal}
      />

      <div className="page-settings !px-6">
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

        <div className="flex flex-col gap-2">
          {groupedData.length > 0 &&
            groupedData.map(([moduleName, masters]) => (
              <Accordion
                key={moduleName}
                className="master-global-accordion"
                itemClasses={{
                  base: "-p-0",
                  title: "master-title text-cerulean-950 font-bold text-lg",
                  content: "master-accordion",
                  trigger: "border-b-red-500",
                }}
                selectionMode="multiple"
                variant="splitted"
              >
                <AccordionItem title={moduleName}>
                  <>
                    {masters.map((master) => (
                      <Accordion
                        key={master.name}
                        className="master-option-global-accordion"
                        itemClasses={{
                          title:
                            "master-option-title text-cerulean-950 font-bold text-base",
                          base: "mb-4",
                          trigger: "![&>span]:rotate-0",
                        }}
                        variant="splitted"
                      >
                        <AccordionItem
                          className="border border-slate-200 shadow-none"
                          subtitle={`Creado: ${format(master.createdAt)}`}
                          title={master.name}
                        >
                          <MasterOptionDataGrid masterId={master.id} />
                        </AccordionItem>
                      </Accordion>
                    ))}
                    <div className="flex flex-row justify-end border border-b-0 border-l-0 border-r-0 border-t-gray-200 p-3">
                      <Button
                        className="standard-btn w-auto text-white"
                        endContent={<AiOutlinePlus />}
                        onClick={() =>
                          handleMasterModalChange(masters, moduleName)
                        }
                      >
                        Agregar maestro
                      </Button>
                    </div>
                  </>
                </AccordionItem>
              </Accordion>
            ))}
        </div>
      </div>
    </>
  );
}
