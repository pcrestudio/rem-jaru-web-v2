"use client";

import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetMastersDto } from "@/app/dto/masters/get-masters.dto";
import { Accordion, AccordionItem } from "@nextui-org/react";
import MasterOptionDataGrid from "@/components/admin/ajustes/master-option-datagrid/MasterOptionDataGrid";
import format from "@/utils/format_date";

export default function Maestros() {
  const { data } = useSWR<GetMastersDto[]>(
    `${environment.baseUrl}/masters`,
    fetcher,
  );

  return (
    <>
      {data && (
        <Accordion
          variant="splitted"
          itemClasses={{
            title: "text-cerulean-950 font-bold text-lg",
            trigger: "border-b-red-500",
          }}
        >
          {data.map((master) => (
            <AccordionItem
              key={master.id}
              aria-label="Accordion 1"
              title={master.module.name}
            >
              <Accordion
                variant="splitted"
                itemClasses={{
                  title: "text-cerulean-950 font-bold text-base",
                  trigger: "![&>span]:rotate-0",
                }}
              >
                <AccordionItem
                  key={master.name}
                  title={master.name}
                  subtitle={`Creado: ${format(master.createdAt)}`}
                  className="border border-slate-200 shadow-none"
                >
                  <MasterOptionDataGrid masterId={master.id} />
                </AccordionItem>
              </Accordion>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  );
}
