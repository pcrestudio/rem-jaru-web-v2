"use client";
import { usePathname } from "next/navigation";
import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";
import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetModuleDto } from "@/app/dto/modules/get-module.dto";
import { Accordion, AccordionItem } from "@nextui-org/react";
import AttributeSection from "@/components/admin/ajustes/attribute-section/AttributeSection";

export default function Personalizar() {
  const pathname = usePathname();
  const { data } = useSWR<GetModuleDto[]>(
    `${environment.baseUrl}/modules`,
    fetcher,
  );

  return (
    <div className="flex flex-col gap-6">
      <BreadcrumbsPath pathname={pathname} />
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-cerulean-950">
          Diseña y gestiona formularios personalizados
        </h1>
        <p className="text-base text-slate-700 max-w-4xl">
          Configura y organiza tus campos clave, incluyendo textos, listas,
          números, entre muchos más para ofrecer una experiencia flexible,
          precisa y adaptada a tus necesidades específicas.
        </p>
      </div>
      {data && (
        <Accordion
          selectionMode="multiple"
          variant="splitted"
          itemClasses={{
            title: "text-cerulean-950 font-bold text-lg",
            trigger: "border-b-red-500",
          }}
        >
          {data.map((module) => (
            <AccordionItem
              key={module.id}
              aria-label={`Accordion ${module.id}`}
              title={module.name}
            >
              <AttributeSection
                key={`Section ${module.id}`}
                moduleId={module.id}
              />
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
