"use client";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import toast from "react-hot-toast";

import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetModuleDto } from "@/app/dto/modules/get-module.dto";
import AttributeSection from "@/components/admin/ajustes/attribute-section/AttributeSection";
import SettingsSectionModal from "@/app/admin/ajustes/maestros/components/settings-section-modal/SettingsSectionModal";
import { CreateSectionAttributeDto } from "@/app/dto/attribute-values/create-section-attribute.dto";
import { createSettingSection } from "@/app/api/attribute-values/atrribute-values";
import { CreateSettingSectionDto } from "@/app/dto/attribute-values/create-setting-section.dto";

export default function Personalizar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSWR<GetModuleDto[]>(
    `${environment.baseUrl}/modules`,
    fetcher,
  );
  const handleSubmit = async (
    payload: CreateSettingSectionDto & CreateSectionAttributeDto,
  ) => {
    const { data } = await createSettingSection({
      ...payload,
      isSection: payload.isSection ?? false,
      collapsable: payload.collapsable ?? false,
      order: Number(payload.order),
    });

    if (data) {
      toast.success(
        payload.isSection
          ? "Sección creada con éxito"
          : "Atributo plano creado con éxito",
      );
      setIsOpen(false);
    } else {
      toast.error("Sucedió algo");
    }
  };

  return (
    <>
      <SettingsSectionModal
        handleSubmit={handleSubmit}
        isOpen={isOpen}
        title={"Nueva sección"}
        onCloseChange={() => setIsOpen(false)}
      />

      <div className="page-settings !px-6">
        <BreadcrumbsPath pathname={pathname} />
        <div className="flex flex-row justify-between items-center">
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

          <Button
            className="standard-btn w-auto text-white"
            endContent={<AiOutlinePlus />}
            onClick={() => setIsOpen(true)}
          >
            Agregar sección
          </Button>
        </div>
        {data && (
          <Accordion
            itemClasses={{
              title: "text-cerulean-950 font-bold text-lg",
              trigger: "border-b-red-500",
            }}
            selectionMode="multiple"
            variant="splitted"
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
    </>
  );
}
