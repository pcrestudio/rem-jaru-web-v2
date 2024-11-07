"use client";

import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetMastersDto } from "@/app/dto/masters/get-masters.dto";
import { Accordion, AccordionItem } from "@nextui-org/react";
import MasterOptionDataGrid from "@/components/admin/ajustes/master-option-datagrid/MasterOptionDataGrid";
import format from "@/utils/format_date";
import { usePathname } from "next/navigation";
import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";

export default function Maestros() {
  const { data } = useSWR<GetMastersDto[]>(
    `${environment.baseUrl}/masters`,
    fetcher,
  );
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6">
      <BreadcrumbsPath pathname={pathname} />
      {data && (
        <Accordion
          selectionMode="multiple"
          variant="splitted"
          itemClasses={{
            title: "text-cerulean-950 font-bold text-lg",
            trigger: "border-b-red-500",
          }}
        >
          {data.map((master: GetMastersDto) => (
            <AccordionItem
              key={master.id}
              aria-label={`Accordion ${master.id}`}
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
    </div>
  );
}
