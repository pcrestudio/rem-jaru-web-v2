"use client";

import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import {
  GetGroupedMastersDto,
  GetMastersDto,
} from "@/app/dto/masters/get-masters.dto";
import { Accordion, AccordionItem } from "@nextui-org/react";
import MasterOptionDataGrid from "@/components/admin/ajustes/master-option-datagrid/MasterOptionDataGrid";
import format from "@/utils/format_date";
import { usePathname } from "next/navigation";
import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";
import { Button } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import MasterModal from "@/app/admin/ajustes/maestros/components/master-modal/MasterModal";
import { UpsertMasterDto } from "@/app/dto/masters/upsert-master.dto";
import { upsertMaster } from "@/app/api/master-option/master-option";
import toast from "react-hot-toast";

export default function Maestros() {
  const { data } = useSWR<GetGroupedMastersDto>(
    `${environment.baseUrl}/masters`,
    fetcher,
  );
  const pathname = usePathname();
  const groupedData = data ? Object.entries(data) : [];
  const [open, setOpen] = useState<boolean>(false);
  const [moduleId, setModuleId] = useState<number>(0);
  const handleModalChange = (masters: GetMastersDto[], moduleName: string) => {
    const module = masters.find(
      (m: GetMastersDto) => m.module?.name === moduleName,
    );
    setModuleId(module.id);
    setOpen(true);
  };
  const handleSubmit = async (payload: UpsertMasterDto) => {
    const { data } = await upsertMaster({
      ...payload,
      moduleId: moduleId !== 0 ? moduleId : null,
    });

    if (data) {
      toast.success("Maestro agregado con éxito.");
      setModuleId(0);

      return setOpen(false);
    }
  };

  return (
    <>
      <MasterModal
        title="Nuevo maestro"
        isOpen={open}
        handleSubmit={handleSubmit}
        onCloseChange={() => setOpen(false)}
      />

      <div className="flex flex-col gap-6">
        <BreadcrumbsPath pathname={pathname} />
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
                      className="text-cerulean-500 text-sm flex flex-row gap-1"
                      onClick={() => handleModalChange(masters, moduleName)}
                      endIcon={<AiOutlinePlus />}
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
